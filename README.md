# PopChoiceAI

PopChoiceAI is an AI-powered movie recommendation app built with React, Tailwind CSS, Supabase, OpenAI, and Cloudflare Workers. It leverages modern AI techniques such as vector search and Retrieval-Augmented Generation (RAG) to deliver personalized movie suggestions based on user input.

## Technologies Used
- **React**: Frontend framework for building interactive UIs.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Supabase**: Backend-as-a-Service (BaaS) for database, authentication, and vector search (via pgvector).
- **OpenAI**: Provides text embeddings for semantic search and matching.
- **Cloudflare Workers**: Serverless edge functions to proxy and secure API requests.

## AI & Data Techniques
- **Vector Search**: User input is embedded using OpenAI, and a similarity search is performed against movie embeddings in Supabase.
- **Retrieval-Augmented Generation (RAG)**: User queries are matched to the most relevant movie data, which can be used for further AI-driven content generation.
- **Embeddings**: Each movie and user query is represented as a high-dimensional vector for semantic comparison.

## How It Works
1. **User Input**: User answers a few questions about their movie preferences.
2. **Embedding Generation**: The app sends the combined input to a Cloudflare Worker, which forwards it to OpenAI to generate an embedding.
3. **Vector Search**: The embedding is sent (via another Worker) to Supabase, which runs a similarity search using a Postgres function and pgvector.
4. **Recommendation**: The best-matching movie is displayed to the user.

## Security
- **API Key Protection**: All sensitive API keys (OpenAI, Supabase service key) are stored in Cloudflare Workers, never exposed to the frontend.

## Setup & Deployment
1. **Frontend**: React + Tailwind CSS (see `src/` for main app code).
2. **Backend**: Supabase project with a movies table, embedding column, and a similarity search function.
3. **Cloudflare Workers**: One or more Workers to proxy requests to OpenAI and Supabase.
