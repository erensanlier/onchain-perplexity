import { getMCPTools } from '../mcp-client';

// This function creates a wrapper for the blockchain tools
// It handles potential errors when the MCP server is not available
export async function getBlockchainTools() {
  try {
    const mcpTools = await getMCPTools();
    
    // Map of tools we want to expose to the AI
    return {
      // Query blockchain datasets directly
      queryBlockchainData: mcpTools.query_dataset || (() => {
        throw new Error('Blockchain data tool is not available');
      }),
      
      // Run SQL queries on blockchain data
      queryBlockchainSQL: mcpTools.query_blockchain_sql || (() => {
        throw new Error('Blockchain SQL tool is not available');
      }),
      
      // Get latest Ethereum block
      getLatestEthereumBlock: mcpTools.get_latest_ethereum_block || (() => {
        throw new Error('Latest block tool is not available');
      }),
      
      // List available datasets
      listBlockchainDatasets: mcpTools.list_datasets || (() => {
        throw new Error('List datasets tool is not available');
      }),
    };
  } catch (error) {
    console.error('Failed to get blockchain tools:', error);
    
    // Return placeholder functions that will inform the user about the error
    return {
      queryBlockchainData: () => {
        return { error: 'Blockchain data service is not available' };
      },
      queryBlockchainSQL: () => {
        return { error: 'Blockchain SQL service is not available' };
      },
      getLatestEthereumBlock: () => {
        return { error: 'Latest block service is not available' };
      },
      listBlockchainDatasets: () => {
        return { error: 'List datasets service is not available' };
      },
    };
  }
} 