#!/usr/bin/env python3
"""Extract SVCollege course files into JSONL chunks.

Supports: PDF, TXT, MD, DOCX.
Keeps the implementation memory-conscious and deterministic.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path
from typing import Iterable, Iterator

import yaml
from rich.console import Console

console = Console()


def read_pdf(path: Path) -> str:
    try:
        import fitz  # PyMuPDF

        parts: list[str] = []
        with fitz.open(path) as doc:
            for page in doc:
                parts.append(page.get_text("text"))
        return "\n".join(parts)
    except Exception:
        try:
            from pypdf import PdfReader

            reader = PdfReader(str(path))
            return "\n".join(page.extract_text() or "" for page in reader.pages)
        except Exception as exc:
            console.print(f"[red]Failed reading PDF {path}: {exc}[/red]")
            return ""


def read_docx(path: Path) -> str:
    try:
        from docx import Document

        doc = Document(str(path))
        return "\n".join(p.text for p in doc.paragraphs)
    except Exception as exc:
        console.print(f"[red]Failed reading DOCX {path}: {exc}[/red]")
        return ""


def read_text(path: Path) -> str:
    for enc in ("utf-8", "utf-8-sig", "cp1255", "latin-1"):
        try:
            return path.read_text(encoding=enc)
        except UnicodeDecodeError:
            continue
    return path.read_text(errors="ignore")


def normalize_text(text: str) -> str:
    text = text.replace("\x00", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def file_text(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix == ".pdf":
        return normalize_text(read_pdf(path))
    if suffix == ".docx":
        return normalize_text(read_docx(path))
    if suffix in {".txt", ".md", ".markdown", ".js", ".jsx", ".ts", ".tsx", ".json", ".html"}:
        return normalize_text(read_text(path))
    return ""


def load_taxonomy(root: Path) -> dict[str, list[str]]:
    taxonomy_path = root / "configs" / "topic_taxonomy.yaml"
    if not taxonomy_path.exists():
        return {}
    data = yaml.safe_load(taxonomy_path.read_text(encoding="utf-8"))
    return {topic: item.get("keywords", []) for topic, item in data.get("topics", {}).items()}


def infer_topic(text: str, taxonomy: dict[str, list[str]]) -> str:
    lowered = text.lower()
    scores: dict[str, int] = {}
    for topic, keywords in taxonomy.items():
        scores[topic] = sum(1 for kw in keywords if str(kw).lower() in lowered)
    if not scores:
        return "unknown"
    best = max(scores.items(), key=lambda item: item[1])
    return best[0] if best[1] > 0 else "unknown"


def chunk_text(text: str, max_chars: int = 3500, overlap: int = 350) -> Iterator[str]:
    text = text.strip()
    if not text:
        return
    start = 0
    while start < len(text):
        end = min(len(text), start + max_chars)
        chunk = text[start:end].strip()
        if chunk:
            yield chunk
        if end == len(text):
            break
        start = max(0, end - overlap)


def iter_files(input_dir: Path) -> Iterable[Path]:
    allowed = {".pdf", ".docx", ".txt", ".md", ".markdown", ".js", ".jsx", ".ts", ".tsx", ".json", ".html"}
    for path in sorted(input_dir.rglob("*")):
        if path.is_file() and path.suffix.lower() in allowed:
            yield path


def chunk_hash(source: str, text: str) -> str:
    h = hashlib.sha256()
    h.update(source.encode("utf-8"))
    h.update(b"\0")
    h.update(text.encode("utf-8"))
    return h.hexdigest()[:16]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--root", type=Path, default=Path.cwd())
    args = parser.parse_args()

    taxonomy = load_taxonomy(args.root)
    args.out.parent.mkdir(parents=True, exist_ok=True)

    count = 0
    with args.out.open("w", encoding="utf-8") as f:
        for path in iter_files(args.input):
            text = file_text(path)
            if not text:
                continue
            for idx, chunk in enumerate(chunk_text(text)):
                topic = infer_topic(chunk, taxonomy)
                record = {
                    "source_path": str(path),
                    "source_title": path.stem,
                    "chunk_index": idx,
                    "topic": topic,
                    "difficulty": "medium",
                    "exam_relevance": 5 if topic != "unknown" else 2,
                    "text": chunk,
                    "chunk_hash": chunk_hash(str(path), chunk),
                }
                f.write(json.dumps(record, ensure_ascii=False) + "\n")
                count += 1
    console.print(f"[green]Wrote {count} chunks to {args.out}[/green]")


if __name__ == "__main__":
    main()
