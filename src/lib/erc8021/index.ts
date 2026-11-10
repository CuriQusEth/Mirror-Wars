/**
 * ERC-8021 Representation Placeholder
 * For full specification: https://eips.ethereum.org/EIPS/eip-8021
 */

// User provided builder code
export const BUILDER_CODE = "bc_kudp5d1w";
export const ATTRIBUTION_CODE = "[ATTRIBUTION_CODE]";
export const CHAIN_ID = 8453; // Base Mainnet (Denim Upgrade, 200ms blocks)
export const NETWORK = "base-mainnet-denim";

export function generateOnchainTransactionProps(action: string, metadata: any) {
  return {
    action,
    attribution: ATTRIBUTION_CODE,
    builder: BUILDER_CODE,
    network: NETWORK,
    chainId: CHAIN_ID,
    blockTime: "200ms",
    metadata,
    timestamp: Date.now(),
  };
}
