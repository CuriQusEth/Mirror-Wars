export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: "MCP Server Active. Use POST for JSON-RPC 2.0 endpoint." });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const { jsonrpc, method, params, id } = body;

      if (jsonrpc !== '2.0') {
        return res.status(400).json({ jsonrpc: "2.0", id: id || null, error: { code: -32600, message: "Invalid Request" } });
      }

      if (method === 'initialize') {
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: { listChanged: false },
              prompts: { listChanged: false },
              resources: { listChanged: false }
            },
            serverInfo: {
              name: "Mirror Wars Orchestrator",
              version: "1.0.0"
            }
          }
        });
      }

      if (method === 'tools/list') {
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: {
            tools: [
              {
                name: "get_race_status",
                description: "Get the status of the race",
                inputSchema: { type: "object", properties: {} }
              },
              {
                name: "start_race",
                description: "Start a new race",
                inputSchema: { type: "object", properties: {} }
              },
              {
                name: "get_leaderboard",
                description: "Get the current leaderboard ratings",
                inputSchema: { type: "object", properties: {} }
              },
              {
                name: "optimize_speed",
                description: "Optimize the speed parameters in the context",
                inputSchema: { type: "object", properties: {} }
              },
              {
                name: "get_track_info",
                description: "Retrieve track information for the current context",
                inputSchema: { type: "object", properties: {} }
              }
            ]
          }
        });
      }

      if (method === 'tools/call') {
         const toolName = params?.name;
         return res.status(200).json({
           jsonrpc: "2.0",
           id,
           result: {
             content: [
               {
                 type: "text",
                 text: `[RESULT] Output for ${toolName}`
               }
             ]
           }
         });
      }

      if (method === 'prompts/list' || method === 'resources/list') {
        return res.status(200).json({
           jsonrpc: "2.0",
           id,
           result: {
             prompts: [],
             resources: []
           }
        });
      }

      return res.status(404).json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
    } catch (error) {
      return res.status(500).json({ jsonrpc: "2.0", id: null, error: { code: -32603, message: "Internal error" } });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
