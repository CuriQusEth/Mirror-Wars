/**
 * ERC-8004 Trustless Agents Placeholder
 * For full specification: https://eips.ethereum.org/EIPS/eip-8004
 */

export interface TrustlessAgentTask {
  agentId: string;
  gameId: string;
  maxGasLimit: bigint;
  executionData: string;
}

export function buildAgentSubmission(task: TrustlessAgentTask) {
  // In a real implementation this would prepare a typed signature for an agent
  return {
    ...task,
    status: "READY_FOR_AGENT",
  };
}
