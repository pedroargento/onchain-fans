import { createWalletClient, custom, Abi, http, createPublicClient } from "viem";
import { anvil } from "viem/chains";
import { Connector, useAccount } from "wagmi";

const CONTRACT_ADDRESS = "0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f";


const callContract = async (address: `0x${string}`, connector: Connector, abi: Abi , functionName: string, params = [], price = BigInt(0)) => {

  if (!address || !connector) {
    console.error("Wallet not connected.");
    return null;
  }

  let walletClient
  try {
    walletClient = createWalletClient({
      chain: anvil, // Change this dynamically if needed
      transport: custom(await connector.getProvider() as any),
    });

  } catch (error) {
    console.error("Error initializing wallet client:", error);
    return null;
  }

  try {
    return await walletClient.writeContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName,
      args: params,
      account: address,
      value: price
    });
  } catch (error) {
    console.error(`Error calling function ${functionName}:`, error);
    return null;
  }
};

const readContract = async (abi: Abi, functionName: string, params = []) => {
  const publicClient = createPublicClient({
    chain: anvil,
    transport: http("http://127.0.0.1:8545"), // Change for production RPC
  });

  try {
    return await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName,
      args: params,
    });
  } catch (error) {
    console.error(`Error reading function ${functionName}:`, error);
    return null;
  }
};

export { callContract, readContract };
