<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is an MCP server project in TypeScript, designed to be used as an npx-executable project. You can find more info and examples at https://modelcontextprotocol.io/llms-full.txt and https://github.com/modelcontextprotocol/create-python-server.


The project exposes a tool called "curl" that accepts a URL, headers, payload, and HTTP method (GET, POST, PATCH, DELETE). The tool should:
- Accept a JSON object with keys: `url` (string), `headers` (object), `payload` (object or string), and `method` (string, one of GET, POST, PATCH, DELETE).
- Perform the HTTP request using fetch, passing headers and payload as required for the method.
- Return the response body as text or JSON, and include error handling.
- Be well-documented for AI usage.

**TypeScript Configuration:**
- The project uses a `tsconfig.json` with `outDir: "./build"` and `rootDir: "./src"` to compile TypeScript files from `src/` to `build/`.
- Target is set to ES2022 with Node16 module resolution for optimal Node.js compatibility.

**npx usage:**
- The project should be published with a `bin` entry in `package.json` (e.g., `"bin": { "mcp-alma-api": "build/index.js" }`).
- The main entry file (`build/index.js`) **must include a shebang** at the top: `#!/usr/bin/env node` (this can be added directly to the TypeScript source file and will be preserved in the compiled JavaScript).
- A `prepare` script is **required** in `package.json` to automatically build the project when installed (e.g., `"prepare": "npm run build"`).
- The build script should make the binary executable: `"build": "tsc && node -e \"require('fs').chmodSync('build/index.js', '755')\""`
- After building and publishing, users can run the server with `npx mcp-alma-api` or locally with `npx .` from the project root.
