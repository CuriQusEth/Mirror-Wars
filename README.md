# Mirror Wars

Mirror Wars is a strategic, mind-bending mirror warfare game with Web3 integration on Base Mainnet.

## Project Overview
You are a Mirror Lord who commands armies in a symmetrical mirror realm. Every unit you deploy has a perfect reflection on the other side of the mirror. You must outsmart your opponent by mastering symmetry, reflection tactics, and dimensional warfare.

## Core Mechanics & Capabilities
- **Symmetrical Deployment**: Deploying a unit spawns its exact reflection in the opponent's territory.
- **Abilities**: Change the tide of battle with Swap and Shatter.
- **On-chain Integration**: Built on Base Denim Mainnet (200ms canonical blocks post-Denim upgrade, replacing Flashblocks), records high scores via ERC-8021 and ERC-8004 standards.
- **Agent Orchestration**: Supports `mirror-battles`, `competitive-mechanics`, `multi-arena-management`, `strategic-automation`, `real-time-orchestration`, and `mcp-command-execution`.

## Base Denim Migration
- **Network**: Base Denim Mainnet (`eip155:8453`)
- **Block Time**: 200ms native canonical blocks (Flashblocks retired on activation)
- **RPC Endpoint**: Canonical HTTP RPC `https://mainnet.base.org`
- **Sub-second Confirmations**: Direct canonical block receipts without deprecated preconfirmations or pending state tags.

## Tech Stack
- Frontend: React / Vite / Canvas
- Styling: Tailwind CSS & Framer Motion
- Web3: Wagmi, Viem, SIWE (Base Denim Mainnet configured)
- Backend: Express API handling MCP integration & Agent Card endpoints

## MCP Connection Guide
This project integrates with the Model Context Protocol (MCP) to allow trustless AI agents to orchestrate gameplay and execute commands. 
- **Endpoint:** `https://mirror-wars.vercel.app/api/mcp`
- **Supported Methods:** `tools/list`, `tools/call`, `prompts/list`, `resources/list`

## Agent Registration Info
The active AI Orchestrator can be discovered via the standard ERC-8004 agent card:
- **Card Location:** `https://mirror-wars.vercel.app/.well-known/agent-card.json`
- **Status:** online
- **Supported Chain:** `eip155:8453` (Base Denim Mainnet, 200ms blocks)

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```
