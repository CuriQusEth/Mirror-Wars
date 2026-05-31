import { NextResponse } from 'next/server';

// CORS Headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json({
    status: "MCP Server Active. Use POST for JSON-RPC 2.0 endpoint."
  }, {
    headers: corsHeaders
  });
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    if (!bodyText) {
      return NextResponse.json(
        { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
        { status: 400, headers: corsHeaders }
      );
    }
    const body = JSON.parse(bodyText);

    const { jsonrpc, method, params, id } = body;

    if (jsonrpc !== '2.0') {
      return NextResponse.json(
        { jsonrpc: "2.0", id: id || null, error: { code: -32600, message: "Invalid Request" } },
        { status: 400, headers: corsHeaders }
      );
    }

    if (method === 'initialize') {
      return NextResponse.json({
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
      }, { headers: corsHeaders });
    }

    if (method === 'tools/list') {
      return NextResponse.json({
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
      }, { headers: corsHeaders });
    }

    if (method === 'tools/call') {
       const toolName = params?.name;
       return NextResponse.json({
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
       }, { headers: corsHeaders });
    }

    if (method === 'prompts/list' || method === 'resources/list') {
      return NextResponse.json({
         jsonrpc: "2.0",
         id,
         result: {
           prompts: [],
           resources: []
         }
      }, { headers: corsHeaders });
    }

    return NextResponse.json(
      { jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } },
      { status: 404, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { jsonrpc: "2.0", id: null, error: { code: -32603, message: "Internal error" } },
      { status: 500, headers: corsHeaders }
    );
  }
}
