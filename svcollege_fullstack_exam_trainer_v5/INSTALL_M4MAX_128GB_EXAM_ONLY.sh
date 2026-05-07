#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

printf "\n== SVCollege Full-Stack Exam Trainer V5 install ==\n"

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is not installed. Install it first from https://brew.sh/ then rerun this script."
  exit 1
fi

brew update
brew install python@3.12 node pnpm git git-lfs cmake ninja jq yq ollama || true

git lfs install || true

python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip wheel setuptools
pip install -r requirements-mac-mlx-v5.txt

pnpm install --dir verifier/js

chmod +x scripts/*.sh
./scripts/01_prepare_dirs.sh

cat <<'MSG'

Install completed.

Next commands:
  ./scripts/02_pull_models.sh
  ./scripts/09_create_ollama_model.sh
  ollama run svcollege-fullstack-exam

Copy your SVCollege files into:
  data/course_files/

Then run:
  python scripts/03_extract_course_files.py --input data/course_files --out data/chunks/source_chunks.jsonl

MSG
