"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
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
const server = new mcp_js_1.McpServer({
    name: "mcp-alma-api",
    version: "1.0.0",
    capabilities: { tools: {} },
});
server.tool("curl", "Perform an HTTP request (GET, POST, PATCH, DELETE) to a given URL with optional headers and payload.", {
    url: zod_1.z.string().url().describe("The endpoint to call."),
    method: zod_1.z.enum(["GET", "POST", "PATCH", "DELETE"]).describe("HTTP method to use."),
    headers: zod_1.z.record(zod_1.z.string()).optional().describe("Key-value pairs for HTTP headers."),
    payload: zod_1.z.union([zod_1.z.string(), zod_1.z.record(zod_1.z.any())]).optional().describe("Request body for POST/PATCH/DELETE."),
}, (_a) => __awaiter(void 0, [_a], void 0, function* ({ url, method, headers, payload }) {
    try {
        const fetchHeaders = headers ? Object.assign({}, headers) : {};
        let fetchOptions = { method, headers: fetchHeaders };
        if (["POST", "PATCH", "DELETE"].includes(method) && payload !== undefined) {
            if (typeof payload === "object") {
                fetchOptions.body = JSON.stringify(payload);
                fetchHeaders["Content-Type"] = "application/json";
            }
            else {
                fetchOptions.body = payload;
            }
        }
        const response = yield fetch(url, fetchOptions);
        const contentType = response.headers.get("content-type") || "";
        let body;
        if (contentType.includes("application/json")) {
            body = yield response.json();
        }
        else {
            body = yield response.text();
        }
        return { content: [{ type: "text", text: JSON.stringify(body, null, 2) }] };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Request failed: ${error.message || error}`,
                },
            ],
        };
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = new stdio_js_1.StdioServerTransport();
        yield server.connect(transport);
        console.error("mcp-alma-api running on stdio");
    });
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
