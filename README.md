# Appointex

`Appointex` is a MERN-ready doctor appointment platform with:

- patient-facing booking frontend
- admin and doctor operations panel
- AI symptom intake and doctor recommendation flow
- downloadable PDF summary report generation

## Project Structure

- [`frontend`](/Users/kartiksansaniwal/Desktop/doctor appointment booking app/frontend)
- [`admin`](/Users/kartiksansaniwal/Desktop/doctor appointment booking app/admin)
- [`backend`](/Users/kartiksansaniwal/Desktop/doctor appointment booking app/backend)

## Quick Start

### Backend

1. Copy [`backend/.env.example`](/Users/kartiksansaniwal/Desktop/doctor appointment booking app/backend/.env.example) to `backend/.env`
2. Install dependencies:
   - `cd backend`
   - `npm install`
3. Start API:
   - `npm run server`
4. Optional NCJIMS-style doctor seed:
   - `npm run seed:ncjims`

### Frontend

1. Copy [`frontend/.env.example`](/Users/kartiksansaniwal/Desktop/doctor appointment booking app/frontend/.env.example) to `frontend/.env`
2. Run:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

### Admin

1. Copy [`admin/.env.example`](/Users/kartiksansaniwal/Desktop/doctor appointment booking app/admin/.env.example) to `admin/.env`
2. Run:
   - `cd admin`
   - `npm install`
   - `npm run dev`

## AI Flow

The AI intake endpoint lives at:

- `POST /api/ai/analyze`

The generated report endpoints are:

- `GET /api/ai/report/:reportId`
- `GET /api/ai/report/:reportId/pdf`

## Notes

- Current AI analysis uses a backend rule-based recommendation layer so the app works without an external model key.
- The architecture is ready to swap to a live LLM-based analyzer later.
- PDF summaries are generated server-side.
