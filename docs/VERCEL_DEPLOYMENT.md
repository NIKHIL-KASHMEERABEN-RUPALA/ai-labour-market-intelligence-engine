# Vercel Deployment & Hosting Guide

This project is pre-configured for instant zero-configuration deployment on **Vercel**.

## 1. Fast Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy directly from repository root
vercel
```

## 2. Deploy via GitHub / GitLab / Bitbucket
1. Push this repository to GitHub.
2. In the Vercel Dashboard, click **Add New Project** and select this repository.
3. Vercel automatically detects the project settings from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set optional Environment Variables in Vercel Project Settings:
   - `HUGGINGFACE_API_KEY`: *(Optional) Your Hugging Face user access token*
   - `HF_MODEL_ID`: *(Optional) Custom fine-tuned model path*
5. Click **Deploy**.

## 3. Serverless Functions Architecture
All `/api/*` endpoints in the `api/` directory run automatically as Vercel Serverless Functions:
- `GET /api/health` -> System health and edge latency check
- `GET /api/telemetry` -> National aggregates & cluster stats
- `POST /api/models` -> Hugging Face inference prediction endpoint
