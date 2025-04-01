# Docker Setup for Onchain Perplexity

This directory contains Docker Compose configuration to run:
1. PostgreSQL database for local development
2. Cryo MCP server for blockchain data querying

## Requirements

- Docker and Docker Compose installed on your system
- Basic understanding of Docker and containerization

## Getting Started

1. Make sure Docker is running on your system
2. Navigate to the project root directory
3. Run the Docker Compose command:

```bash
docker-compose up -d
```

This will start both PostgreSQL and Cryo MCP services in the background.

## Service Details

### PostgreSQL

- **Host**: localhost
- **Port**: 5432
- **Username**: postgres
- **Password**: postgres
- **Database**: onchain_perplexity
- **Connection String**: `postgres://postgres:postgres@localhost:5432/onchain_perplexity`

To connect to the PostgreSQL database:

```bash
psql postgresql://postgres:postgres@localhost:5432/onchain_perplexity
```

### Cryo MCP

The Cryo MCP server provides access to blockchain data through a Model Completion Protocol.

- **API Endpoint**: http://localhost:8000
- **Data Directory**: Mounted as a volume to persist data between container restarts

## Development Workflow

1. Use the PostgreSQL database in your application by setting the environment variable:
   ```
   POSTGRES_URL=postgres://postgres:postgres@localhost:5432/onchain_perplexity
   ```
   
2. Run database migrations to set up your schema:
   ```bash
   npm run db:migrate
   ```

3. Use Cryo MCP to query blockchain data in your application. Examples:
   ```python
   # Python example
   import requests
   
   response = requests.post("http://localhost:8000/mcp/v1", 
       json={
           "tool": "query_dataset",
           "params": {
               "dataset": "blocks",
               "blocks_from_latest": 100
           }
       }
   )
   print(response.json())
   ```

## Stopping the Services

To stop all running containers:

```bash
docker-compose down
```

To stop the services and remove all data volumes (warning: this will delete all database data):

```bash
docker-compose down -v
``` 