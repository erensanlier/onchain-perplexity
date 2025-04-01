import { experimental_createMCPClient } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';

let mcpClient: Awaited<ReturnType<typeof experimental_createMCPClient>> | null = null;

export async function initMCPClient() {
  if (mcpClient) {
    return mcpClient;
  }

  try {
    const transport = new Experimental_StdioMCPTransport({
        command: 'cryo-mcp',
        args: ['--rpc-url', process.env.ETH_RPC_URL || 'https://gateway.tenderly.co/public/mainnet', '--data-dir', process.env.CRYO_DATA_DIR || './data'],
      });
    mcpClient = await experimental_createMCPClient({
      transport,
    });
    
    return mcpClient;
  } catch (error) {
    console.error('Failed to initialize MCP client:', error);
    throw error;
  }
}

export async function closeMCPClient() {
  if (mcpClient) {
    await mcpClient.close();
    mcpClient = null;
  }
}

export async function getMCPTools() {
  const client = await initMCPClient();
  return await client.tools();
} 