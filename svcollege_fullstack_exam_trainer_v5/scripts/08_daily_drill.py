#!/usr/bin/env python3
"""Generate a daily drill prompt from the SVCollege topic list."""
from __future__ import annotations

import argparse
import random
from pathlib import Path

TOPICS = [
    "JavaScript variables/types",
    "JavaScript arrays map/filter/find/reduce",
    "DOM and events",
    "localStorage/sessionStorage",
    "try/catch/throw",
    "async/await/fetch/setTimeout",
    "React components/props/map",
    "React useState immutable updates",
    "useEffect/useRef/useMemo",
    "React Router and Context",
    "Express middleware and CRUD",
    "MongoDB/Mongoose CRUD",
    "TypeScript types/enums/functions",
    "React+TS props/state typing",
    "Full-stack project task",
]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=Path("outputs/daily_drill_prompt.md"))
    parser.add_argument("--seed", type=int, default=None)
    args = parser.parse_args()

    rng = random.Random(args.seed)
    selected = rng.sample(TOPICS, 8)
    prompt = """# Daily SVCollege Drill

Create a daily training session in Hebrew.
Use English code.

Include:
1. 10 quick questions
2. 3 code questions
3. 1 full-stack mini task
4. 1 exam trap question
5. answer key
6. weak-topic remediation plan

Focus topics:
"""
    prompt += "\n".join(f"- {topic}" for topic in selected)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(prompt, encoding="utf-8")
    print(args.out)


if __name__ == "__main__":
    main()
