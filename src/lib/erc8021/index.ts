/**
 * ERC-8021 Representation Placeholder
 * For full specification: https://eips.ethereum.org/EIPS/eip-8021
 */

// User provided builder code
export const BUILDER_CODE = "bc_kudp5d1w";
export const ATTRIBUTION_CODE = "[ATTRIBUTION_CODE]";

export function generateOnchainTransactionProps(action: string, metadata: any) {
  return {
    action,
    attribution: ATTRIBUTION_CODE,
    builder: BUILDER_CODE,
    metadata,
    timestamp: Date.now(),
  };
}
