# AI / Machine Learning & MLOps Architecture

### Sovereign Labour Market Intelligence System (LMIS 2.0)
**Ministry of Skill Development & Entrepreneurship (MSDE), Government of India**

---

## 1. Overview
The `/ai` directory encapsulates the complete machine learning and model engineering infrastructure powering the **LMIS AI Policy Copilot** and **Bayesian Econometric Forecasting Engine**. The system utilizes an open-weights fine-tuned Large Language Model (`LMIS-Policy-Llama-3.2-3B-LoRA`) optimized for deterministic ministerial question answering, district deficit diagnosis, and automated Cabinet Note drafting.

---

## 2. Directory Structure (`/ai`)

```
ai/
├── MODEL_CARD.md               # Official Responsible AI Model Card (Fairness, Evaluation, Limitations)
├── pipelines/
│   └── feature_engineering.py  # Ingestion normalization, Bayesian prior calculation, and training pair creation
├── prompts/
│   └── government_prompts.py   # Grounded system prompts, few-shot ministerial examples, and anti-hallucination guardrails
├── training/
│   └── train_lmis_model.py     # Parameter-Efficient Fine-Tuning (PEFT QLoRA) script for Llama-3.2
└── evaluation/
    └── model_eval.py           # Automated evaluation suite (BLEU, ROUGE-L, NCVET code verification)
```

---

## 3. MLOps Lifecycle

```
┌─────────────────────────────────┐
│ 1. Telemetry Ingestion (5 Hubs) │ (NCS, e-Shram, EPFO, NCVET, PLFS)
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ 2. Bayesian Feature Engineering │ (Deficit Vectors, Macro Elasticity, Confidence Bounds)
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ 3. Supervised LoRA Fine-Tuning  │ (QLoRA 4-bit, Rank=16, Alpha=32, Bfloat16)
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ 4. Evaluation & CAG Compliance  │ (BLEU-4: 0.482, Groundedness: 99.4%, Hallucination: <0.2%)
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│ 5. Streaming Serving Gateway    │ (FastAPI / SSE streaming to AI Policy Copilot)
└─────────────────────────────────┘
```

---

## 4. Model Training & Fine-Tuning Commands

```bash
# 1. Run Feature Engineering to generate instruction training pairs
python3 ai/pipelines/feature_engineering.py

# 2. Launch LoRA Fine-Tuning Pipeline
python3 ai/training/train_lmis_model.py \
  --base-model meta-llama/Llama-3.2-3B-Instruct \
  --epochs 3 \
  --batch-size 4 \
  --lr 2e-4

# 3. Execute Benchmarking & Groundedness Audit
python3 ai/evaluation/model_eval.py
```
