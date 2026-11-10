import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add CORS headers for API testing
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  app.use(express.json());

  // API routes FIRST
  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Mirror Wars MCP Endpoint",
      status: "active",
      description: "Active MCP server for Mirror Wars Orchestrator Agent",
      capabilities: [
        "mirror-battles", 
        "competitive-mechanics", 
        "strategic-automation",
        "multi-arena-management",
        "real-time-orchestration",
        "mcp-command-execution"
      ],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      const { method, params } = body;

      if (method === 'tools/list') {
        return res.json({
          tools: [
            { name: "get_race_status", description: "Get the status of [PLACEHOLDER]", inputSchema: { type: "object", properties: {} } },
            { name: "start_race", description: "Start a new [PLACEHOLDER]", inputSchema: { type: "object", properties: {} } },
            { name: "get_leaderboard", description: "Get the current leaderboard ratings", inputSchema: { type: "object", properties: {} } },
            { name: "optimize_speed", description: "Optimize the speed parameters in [PLACEHOLDER]", inputSchema: { type: "object", properties: {} } },
            { name: "get_track_info", description: "Retrieve track information for [PLACEHOLDER]", inputSchema: { type: "object", properties: {} } }
          ]
        });
      }

      if (method === 'tools/call') {
        const toolName = params?.name;
        return res.json({
          status: "success",
          message: `Executed tool: ${toolName}`,
          agent: "Mirror Wars Orchestrator",
          receivedAt: new Date().toISOString(),
          result: "[PLACEHOLDER_RESULT]"
        });
      }

      if (method === 'prompts/list' || method === 'resources/list') {
        return res.json({ items: [] });
      }

      res.json({
        status: "success",
        message: "MCP command received",
        agent: "Mirror Wars Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid MCP request" });
    }
  });

  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Mirror Wars Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      network: "Base Denim Mainnet (eip155:8453)",
      blockTime: "200ms",
      platform: "Mirror Wars",
      version: "1.0.0"
    });
  });

  app.post("/api/agent", (req, res) => {
    res.json({
      status: "success",
      message: "Agent command received"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, Vite compiles public folder contents into dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
