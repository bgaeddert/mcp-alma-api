<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is an MCP server project in TypeScript, designed to be used as an npx-executable project. You can find more info and examples at https://modelcontextprotocol.io/llms-full.txt and https://github.com/modelcontextprotocol/create-python-server.


The project exposes a tool called "curl" that accepts a URL, headers, payload, and HTTP method (GET, POST, PATCH, DELETE). The tool should:
- Accept a JSON object with keys: `url` (string), `headers` (object), `payload` (object or string), and `method` (string, one of GET, POST, PATCH, DELETE).
- Perform the HTTP request using fetch, passing headers and payload as required for the method.
- Return the response body as text or JSON, and include error handling.
- Be well-documented for AI usage.

**npx usage:**
- The project should be published with a `bin` entry in `package.json` (e.g., `"bin": { "mcp-alma-api": "build/index.js" }`).
- After building and publishing, users can run the server with `npx mcp-alma-api` or locally with `npx .` from the project root.
