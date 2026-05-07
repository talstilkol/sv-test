#!/usr/bin/env bash
set -euo pipefail

MODEL_PATH="${TRAIN_MODEL_PATH:-Qwen/Qwen3-Coder-Next}"
DATA_DIR="${DATA_DIR:-data/sft}"
ADAPTER_PATH="${ADAPTER_PATH:-outputs/adapters/svcollege-fullstack-v1}"

if [ ! -f "$DATA_DIR/train.jsonl" ]; then
  echo "Missing $DATA_DIR/train.jsonl. Run dataset build and split first."
  exit 1
fi

source .venv/bin/activate

mlx_lm.lora \
  --model "$MODEL_PATH" \
  --train \
  --data "$DATA_DIR" \
  --iters "${ITERS:-600}" \
  --batch-size "${BATCH_SIZE:-1}" \
  --grad-accumulation-steps "${GRAD_ACCUM:-8}" \
  --num-layers "${NUM_LAYERS:-8}" \
  --learning-rate "${LR:-1e-5}" \
  --adapter-path "$ADAPTER_PATH"

printf "Adapter saved to %s\n" "$ADAPTER_PATH"
