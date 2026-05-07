#!/usr/bin/env python3
"""Validate SFT JSONL and split into train/valid/test without prompt leakage."""
from __future__ import annotations

import argparse
import hashlib
import json
import random
import re
from pathlib import Path
from typing import Any, Iterable


def normalize_prompt(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[^\w\u0590-\u05ff ]+", "", text)
    return text


def hash_prompt(text: str) -> str:
    return hashlib.sha256(normalize_prompt(text).encode("utf-8")).hexdigest()[:16]


def read_jsonl(path: Path) -> list[dict[str, Any]]:
    records = []
    with path.open("r", encoding="utf-8") as f:
        for idx, line in enumerate(f, 1):
            if not line.strip():
                continue
            rec = json.loads(line)
            validate_sft_record(rec, idx)
            records.append(rec)
    return records


def validate_sft_record(rec: dict[str, Any], idx: int) -> None:
    messages = rec.get("messages")
    if not isinstance(messages, list) or len(messages) < 3:
        raise ValueError(f"Record {idx}: messages must include system/user/assistant")
    roles = [m.get("role") for m in messages[:3]]
    if roles != ["system", "user", "assistant"]:
        raise ValueError(f"Record {idx}: first roles must be system,user,assistant")
    for m in messages:
        if not isinstance(m.get("content"), str) or not m["content"].strip():
            raise ValueError(f"Record {idx}: empty message content")


def dedupe(records: Iterable[dict[str, Any]]) -> list[dict[str, Any]]:
    seen: set[str] = set()
    out: list[dict[str, Any]] = []
    for rec in records:
        user_text = next(m["content"] for m in rec["messages"] if m["role"] == "user")
        h = hash_prompt(user_text)
        if h in seen:
            continue
        seen.add(h)
        rec.setdefault("meta", {})["prompt_hash"] = h
        out.append(rec)
    return out


def write_jsonl(path: Path, records: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        for rec in records:
            f.write(json.dumps(rec, ensure_ascii=False) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    records = dedupe(read_jsonl(args.input))
    random.Random(args.seed).shuffle(records)

    n = len(records)
    train_end = int(n * 0.8)
    valid_end = int(n * 0.9)

    splits = {
        "train.jsonl": records[:train_end],
        "valid.jsonl": records[train_end:valid_end],
        "test.jsonl": records[valid_end:],
    }
    for filename, split_records in splits.items():
        write_jsonl(args.out / filename, split_records)
        print(f"{filename}: {len(split_records)}")

    # Hard no-leak check across splits
    hashes_by_split = {name: {r["meta"]["prompt_hash"] for r in recs} for name, recs in splits.items()}
    names = list(hashes_by_split)
    for i, a in enumerate(names):
        for b in names[i + 1:]:
            overlap = hashes_by_split[a] & hashes_by_split[b]
            if overlap:
                raise RuntimeError(f"Leakage between {a} and {b}: {overlap}")


if __name__ == "__main__":
    main()
