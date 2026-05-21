import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { status: "MCP Server Active. Use POST for JSON-RPC." },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // MCP JSON-RPC 2.0 implementation
    const { jsonrpc, method, params, id } = body;

    // Check JSON-RPC version
    if (jsonrpc !== '2.0') {
      return NextResponse.json(
        { jsonrpc: "2.0", id, error: { code: -32600, message: "Invalid Request" } },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' } }
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
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    // Handle tool listing and execution
    if (method === 'tools/list') {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "get_race_status",
              description: "Get the status of [PLACEHOLDER]",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "start_race",
              description: "Start a new [PLACEHOLDER]",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_leaderboard",
              description: "Get the current leaderboard ratings",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "optimize_speed",
              description: "Optimize the speed parameters in [PLACEHOLDER]",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_track_info",
              description: "Retrieve track information for [PLACEHOLDER]",
              inputSchema: { type: "object", properties: {} }
            }
          ]
        }
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    if (method === 'tools/call') {
       // Logic to handle calling the 5 requested tools
       const toolName = params?.name;
       return NextResponse.json({
         jsonrpc: "2.0",
         id,
         result: {
           content: [
             {
               type: "text",
               text: `[PLACEHOLDER_RESULT] Output for ${toolName}`
             }
           ]
         }
       }, {
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
           'Access-Control-Allow-Headers': 'Content-Type, Authorization'
         }
       });
    }

    if (method === 'prompts/list' || method === 'resources/list') {
      return NextResponse.json({
         jsonrpc: "2.0",
         id,
         result: {
           prompts: [],
           resources: []
         }
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    // Unknown method
    return NextResponse.json(
      { jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } },
      { status: 404, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' } }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid MCP request" },
      { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
       }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
