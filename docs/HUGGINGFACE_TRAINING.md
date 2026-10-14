# Hugging Face Model Training & Fine-Tuning Guide

This guide details how to fine-tune open-weights models for the National Labour Market Intelligence System (LMIS).

## 1. Environment Setup
```bash
pip install torch transformers datasets peft trl bitsandbytes accelerate
```

## 2. Prepare Training Dataset
Generate structured instruction pairs from national telemetry:
```bash
python scripts/prepare_dataset.py
```
This produces `lmis_training_dataset.json` formatted for instruction fine-tuning.

## 3. Run PEFT / LoRA Fine-Tuning
Execute the training script:
```bash
python scripts/train_lmis_model.py \
  --base-model meta-llama/Llama-3.2-3B-Instruct \
  --dataset lmis_training_dataset.json \
  --output-dir ./models/lmis-lora-adapter \
  --epochs 3 \
  --batch-size 4
```

## 4. Deploying to Hugging Face Hub & LMIS Backend
1. Login to your Hugging Face account:
   ```bash
   huggingface-cli login
   ```
2. Upload the trained adapter:
   ```python
   from peft import PeftModel
   from transformers import AutoModelForCausalLM

   model.push_to_hub("your-org/lmis-labour-demand-predictor")
   ```
3. Set the environment variable in `.env`:
   ```env
   HF_MODEL_ID=your-org/lmis-labour-demand-predictor
   HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxx
   ```
The LMIS Backend service (`backend/services/huggingface.service.ts`) will automatically direct inference requests to your fine-tuned model!
