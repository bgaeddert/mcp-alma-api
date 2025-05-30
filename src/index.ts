import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/**
 * curl tool: Perform HTTP requests (GET, POST, PATCH, DELETE) with custom headers and payload.
 *
 * Input:
 *   - url: string (required) - The endpoint to call.
 *   - method: string (required) - One of GET, POST, PATCH, DELETE.
 *   - headers: object (optional) - Key-value pairs for HTTP headers.
 *   - payload: object|string (optional) - The request body (for POST/PATCH/DELETE).
 *
 * Output:
 *   - The HTTP response body (JSON or text).
 *   - Error information if the request fails.
 */
const server = new McpServer({
  name: "mcp-alma-api",
  version: "1.0.0",
  capabilities: { tools: {} },
});

server.tool(
  "curl",
  "Perform an HTTP request (GET, POST, PATCH, DELETE) to a given URL with optional headers and payload.",
  {
    url: z.string().url().describe("The endpoint to call."),
    method: z.enum(["GET", "POST", "PATCH", "DELETE"]).describe("HTTP method to use."),
    headers: z.record(z.string()).optional().describe("Key-value pairs for HTTP headers."),
    payload: z.union([z.string(), z.record(z.any())]).optional().describe("Request body for POST/PATCH/DELETE."),
  },
  async ({ url, method, headers, payload }) => {
    try {
      const fetchHeaders = headers ? { ...headers } : {};
      let fetchOptions: RequestInit = { method, headers: fetchHeaders };
      if (["POST", "PATCH", "DELETE"].includes(method) && payload !== undefined) {
        if (typeof payload === "object") {
          fetchOptions.body = JSON.stringify(payload);
          fetchHeaders["Content-Type"] = "application/json";
        } else {
          fetchOptions.body = payload;
        }
      }
      const response = await fetch(url, fetchOptions);
      const contentType = response.headers.get("content-type") || "";
      let body: any;
      if (contentType.includes("application/json")) {
        body = await response.json();
      } else {
        body = await response.text();
      }
      return { content: [{ type: "text", text: JSON.stringify(body, null, 2) }] };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Request failed: ${error.message || error}`,
          },
        ],
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("mcp-alma-api running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
