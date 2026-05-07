#!/usr/bin/env bash
set -euo pipefail

if ! command -v ollama >/dev/null 2>&1; then
  echo "Ollama CLI not found. Install Ollama first."
  exit 1
fi

ollama pull qwen3-coder-next
ollama pull qwen3:8b || true

cat <<'MSG'
Models pulled.
Recommended daily model:
  ollama run svcollege-fullstack-exam
Base model:
  ollama run qwen3-coder-next
MSG
