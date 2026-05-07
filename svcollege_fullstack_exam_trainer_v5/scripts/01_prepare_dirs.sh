#!/usr/bin/env bash
set -euo pipefail
mkdir -p data/{raw,course_files,chunks,sft,dpo,eval,generated}
mkdir -p outputs/{adapters,eval,models}
mkdir -p logs
printf "Prepared SVCollege exam trainer directories.\n"
