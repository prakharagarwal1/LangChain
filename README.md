# LangChain Movie Recommendations API

A TypeScript Express server that uses LangChain to generate movie recommendations via an LLM. The server is configured to route requests through **OpenRouter**.

## Features

- Express server with CORS and JSON body parsing
- LangChain integration using `@langchain/openai` and `@langchain/core`
- Movie recommendations based on user prompt, genre, mood, and count
- OpenRouter API routing (uses OpenAI-compatible interface)
- Health check endpoint

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express
- **LLM**: LangChain (`@langchain/openai`, `@langchain/core`)
- **Validation**: Zod
- **Process Manager**: Nodemon (dev)

## Prerequisites

- Node.js (v18+)
- npm or pnpm
- An OpenRouter API key (set as `OPENAI_API_KEY` in `.env`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create and configure the `.env` file (see [Configuration](#configuration)):

```bash
cp .env.example .env   # if available
```

Add your OpenRouter configuration:

```env
OPENAI_API_KEY=sk-or-v1-...
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_MODEL=dots-studio/dots-3-note-preview:free
OPENAI_TEMPERATURE=0.3
PORT=3000
APP_URL=http://localhost:3000
APP_NAME=LangChain App
```

3. Build the TypeScript project:

```bash
npm run build
```

## Running

### Development mode (with hot reload)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

## API Endpoints

### Health check

`GET /health`

Returns a simple status message.

### Get movie recommendations

`POST /api/recommend`

**Request body:**

```json
{
  "userPrompt": "Suggest movies for a rainy night",
  "genre": "thriller",
  "mood": "relaxed",
  "count": 5
}
```

**Response:**

```json
{
  "recommendations": "..."
}
```

## Configuration

All configuration is read from environment variables:

| Variable               | Default                                  | Description                                  |
| ---------------------- | ---------------------------------------- | -------------------------------------------- |
| `OPENAI_API_KEY`       | (required)                               | Your OpenRouter API key                      |
| `OPENAI_BASE_URL`      | `https://openrouter.ai/api/v1`           | OpenRouter API base URL                      |
| `OPENAI_MODEL`         | `dots-studio/dots-3-note-preview:free`   | Model name                                   |
| `OPENAI_TEMPERATURE`   | `0.3`                                    | LLM sampling temperature                     |
| `PORT`                 | `3000`                                   | Port the server listens on                   |
| `APP_URL`              | `localhost`                              | Application base URL                         |
| `APP_NAME`             | `LangChain App`                          | Application name                             |

## Project Structure

```
src/
├── index.ts                 # Entry point / Express app setup
├── services/
│   ├── langchain.service.ts # LLM + prompt template
│   └── index.ts
├── controller/
│   ├── langchain.controller.ts # Request handling
│   └── index.ts
├── routes/
│   ├── langchain.route.ts      # Express routes
│   └── index.ts
└── schema/
    └── movie.schema.ts         # Validation schemas
```

## Notes

- The LLM client uses OpenRouter's OpenAI-compatible endpoint (`https://openrouter.ai/api/v1`).
- Model used: `dots-studio/dots-3-note-preview:free`.

## License

ISC