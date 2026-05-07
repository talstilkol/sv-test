#!/usr/bin/env bash
set -euo pipefail

ollama create svcollege-fullstack-exam -f configs/ollama/Modelfile.svcollege-fullstack-exam
cat <<'MSG'
Created Ollama model: svcollege-fullstack-exam
Run:
  ollama run svcollege-fullstack-exam
MSG
