# DepoIntel Backend

A Node.js backend service for DepoIntel that handles case data management, Google Sheets integration, and API endpoints.

## Features

### Case Management
- Fetch cases from Trellis API with filtering capabilities
- Get detailed case information including parties and judge details
- Support for multiple jurisdictions (OH, IN, IL, IA, MI, MO, KS, MN, WI)
- Case data validation and error handling

### Google Sheets Integration
- Automatic case data synchronization to Google Sheets
- Duplicate detection to prevent redundant entries
- Real-time updates with error handling
- Support for multiple sheet operations (append, read, update)

### API Endpoints
- `/api/cases` - Case management endpoints
  - `POST /` - Fetch and filter cases
  - `GET /:caseId` - Get detailed case information
- `/api/tokens` - Token management endpoints
- `/api/health` - Health check endpoint

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Cloud Platform account with Sheets API enabled
- Trellis.law API credentials

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd depointel/Backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with the following variables:
```env
# Server Configuration
PORT=3001

# Trellis API Configuration
TRELLIS_API_KEY=your_api_key
TRELLIS_API_URL=your_api_url
TRELLIS_CSRF_TOKEN=your_csrf_token

# Google Sheets Configuration
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
GOOGLE_PRIVATE_KEY_ID=your_private_key_id
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_UNIVERSE_DOMAIN=googleapis.com
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_SHEETS_ID=your_spreadsheet_id
```

4. Start the development server
```bash
npm run dev
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Project Structure

```
Backend/
├── server/
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic
│   ├── routes/         # API routes
│   ├── config/         # Configuration files
│   └── scripts/        # Utility scripts
├── dist/              # Compiled JavaScript
└── tests/             # Test files
```

## Error Handling

The backend implements comprehensive error handling:
- API request validation
- Error logging
- Graceful error responses
- Retry mechanisms for external services

## Security

- Environment variable management
- API key protection
- CORS configuration
- Input validation
- Rate limiting (TODO)

## Future Enhancements

- [ ] Implement rate limiting
- [ ] Add caching layer
- [ ] Implement WebSocket for real-time updates
- [ ] Add comprehensive logging system
- [ ] Implement automated testing
- [ ] Add API documentation with Swagger
- [ ] Implement user authentication
- [ ] Add data backup system

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC 