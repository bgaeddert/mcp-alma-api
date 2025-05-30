# MCP Alma API Server

This project is an MCP (Model Context Protocol) server implemented in TypeScript, designed to be run as an npx-executable CLI. It exposes a tool called `curl` that allows AI or users to perform HTTP requests (GET, POST, PATCH, DELETE) with custom headers and payloads.

## Features
- **curl tool**: Accepts a URL, headers, payload, and HTTP method. Performs the HTTP request and returns the response.
- Built with [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) and [zod](https://zod.dev/).
- Ready for integration with Claude for Desktop and other MCP clients.

## Usage

## npx Usage
After building and publishing, you (or users) can run the server directly with:

```sh
npx mcp-alma-api
```

Or, for local development, use:

```sh
npx .
```

## Development
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Build the project:
   ```powershell
   npm run build
   ```
3. (Optional) Run directly for testing:
   ```powershell
   node build/index.js
   ```


## curl Tool API
- **Input:**
  - `url` (string): The endpoint to call.
  - `headers` (object): Key-value pairs for HTTP headers.
  - `payload` (object|string): The request body (for POST/PATCH/DELETE).
  - `method` (string): One of `GET`, `POST`, `PATCH`, `DELETE`.
- **Output:**
  - The HTTP response body (JSON or text).
  - Error information if the request fails.

### Claude for Desktop MCP Server Settings Example
Add this to your Claude MCP config (e.g. `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "alma-curl-server": {
      "command": "npx",
      "args": ["mcp-alma-api"]
    }
  }
}
```

## Development
- Source code is in `src/index.ts`.
- Build output is in `build/`.

## References
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/quickstart/server)
- [TypeScript MCP Server Example](https://github.com/modelcontextprotocol/quickstart-resources/tree/main/weather-server-typescript)
