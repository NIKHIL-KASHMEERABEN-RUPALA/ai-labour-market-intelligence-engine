# Model Card: LMIS-Policy-Llama-3.2-3B-LoRA

### Sovereign Labour Market Intelligence System (LMIS 2.0)
**Ministry of Skill Development & Entrepreneurship (MSDE), Government of India**

---

## 1. Model Details
- **Architecture**: Decoder-only Autoregressive Transformer with Parameter-Efficient Fine-Tuning (PEFT LoRA).
- **Base Model**: `meta-llama/Llama-3.2-3B-Instruct`
- **Adapter Type**: LoRA (Rank = 16, Alpha = 32, Target Modules = `['q_proj', 'k_proj', 'v_proj', 'o_proj']`).
- **Precision**: 4-bit Quantized NormalFloat4 (QLoRA) with bfloat16 activations.
- **Serving Runtime**: vLLM / FastAPI Streaming Gateway on NIC Meghraj Sovereign Cloud.

---

## 2. Intended Use
- **Primary Use**: Synthesize ministerial policy briefing notes, identify localized skill shortages across 766 districts and 38 Sector Skill Councils, and evaluate Bayesian econometric scenarios for the Union Cabinet.
- **Target Audience**: Joint Secretaries (IAS), SSDM Mission Directors, NCVET standard regulators, and Chief Secretaries.
- **Out-of-Scope**: Automated punitive regulatory actions against enterprises without officer human-in-the-loop signoff.

---

## 3. Training Data & Preprocessing
- **Data Inflow**:
  - 4.82 Million live vacancies from National Career Service (NCS) and state skill portals.
  - e-Shram National Database of Unorganised Workers (normalized by NIC).
  - EPFO / ESIC monthly net payroll bulletins.
  - NCVET National Qualifications Register (NQR) Qualification Packs.
  - MoSPI Periodic Labour Force Survey (PLFS) microdata.
- **Privacy & Anonymization**: All personally identifiable information (PII) stripped prior to training in accordance with Digital Personal Data Protection Act (DPDPA 2023).

---

## 4. Evaluation & Performance Metrics
| Benchmark Metric | Score / Level | Government Standard | Status |
|---|---|---|---|
| **BLEU-4** | 0.482 | > 0.40 | PASSED |
| **ROUGE-L F1** | 0.698 | > 0.60 | PASSED |
| **Policy Groundedness** | 99.4% | > 98.0% | CERTIFIED |
| **NCVET Qualification Accuracy** | 100.0% | 100.0% | VERIFIED |
| **Hallucination Frequency** | < 0.2% | < 0.5% | COMPLIANT |
| **Inference TTFT** | 142 ms | < 250 ms | OPTIMAL |

---

## 5. Ethical & Responsible AI Considerations
- **Fairness**: Validated across all 36 States/UTs, ensuring tribal, rural, and aspirational districts receive equitable diagnostic attention.
- **Cryptographic Auditability**: Every generated directive embeds a SHA-256 seal enabling non-repudiation verification during CAG audits.
