# DepoIntel

A LegalTech automation tool that identifies civil litigation cases, extracts deposition data from Trellis, and syncs leads into a Google Sheet with a live dashboard for attorney engagement.

## Phase 1 Features

- Trellis.law integration for case monitoring and deposition extraction
- Google Sheets syncing for lead management
- React/Tailwind dashboard with filters and case highlights
- CSV export functionality
- GitHub Actions automation with daily jobs and alerts

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Cloud Platform account (for Google Sheets API)
- Trellis.law API credentials
- GitHub account (for Actions)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd depointel
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
depointel/
├── client/             # React frontend
├── server/             # Node.js backend
├── scripts/            # Automation scripts
└── github/             # GitHub Actions workflows
```

## Development

- Frontend: `npm run dev:client`
- Backend: `npm run dev:server`
- Both: `npm run dev`

## License

ISC 