# SVCollege Exam Trainer State

Current status: V5 package generated.

Goal: Full‑Stack SVCollege exam training only.

Completed:
- Exam-only master plan
- GPT‑5.5 prompt
- install script
- Ollama Modelfile
- course extractor
- dataset seed builder
- no-leak split validator
- MLX LoRA script
- Ollama evaluator
- JS verifier toolchain

Next:
1. Copy course files into data/course_files/
2. Run extraction
3. Build seed dataset
4. Use GPT‑5.5 to generate high-quality SFT/DPO/eval expansions
5. Run locked eval before LoRA
6. Train small MLX LoRA only if justified

Known bottlenecks:
- Dataset quality matters more than quantity.
- Locked eval must remain clean.
- LoRA may not outperform RAG+Verifier; promote only after measurement.
