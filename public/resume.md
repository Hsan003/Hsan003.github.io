# HSAN ELLOUZE

**Software Engineering Student | Fullstack & Backend Engineer | AI Systems**

hsanellouz@gmail.com | [hsanellouze.me](https://hsanellouze.me) | [linkedin.com/in/hsanellouze](https://linkedin.com/in/hsanellouze) | [github.com/Hsan003](https://github.com/Hsan003)

## Summary

Final-year Software Engineering student (INSAT) with three internships building production fullstack and AI-integrated systems, from RAG backends serving real users to Docker/CI-CD pipelines cutting deployment time. Comfortable across the full stack: React/Next.js, FastAPI/Express/NestJS, distributed data stores, and multi-agent system design.

## Projects

**Kubemind: AI-Driven Kubernetes Observability Platform** *(3-person capstone team)*
- Designed a 5-layer agentic software architecture (ingestion, AI agents, correlation/storage, presentation) for automated incident diagnosis
- Built 3 specialized LangChain/LangGraph agents (logs, metrics, events) orchestrated via a LangGraph StateGraph workflow, feeding a correlation agent
- Developed a FastAPI backend and Next.js dashboard on a real-time ingestion pipeline (Prometheus, Loki, Kafka, MongoDB)
- Benchmarked output quality across 3 LLM providers (OpenAI, Gemini, Ollama) across 3 controlled incident scenarios

**Multi-Tenant AI Chatbot Widget**
- Designed a reusable, embeddable AI chatbot component for multi-tenant deployment across client websites via a single `<script>` tag
- Implemented Shadow DOM isolation and strict domain validation for secure multi-tenant use
- Built the backend with Hono, Supabase, and Upstash Redis; deployed on Railway and Cloudflare Pages

**PromptCraft: AI NFT Generation & Auction Platform**
- Built an end-to-end platform combining AI-generated artwork with a live auction marketplace
- Implemented a WebSocket/SSE bidding system supporting 100+ concurrent users, cutting latency ~60%

## Experience

**AI Engineer Intern – Applicare** | Jun 2026 – Aug 2026
- Designed and built AskSahera, a bilingual (FR/EN) production RAG chatbot indexing ~100 source documents
- Built a dual-source ingestion pipeline (PubMed XML + GROBID PDF parsing) with IMRAD-aware chunking and a sliding-window fallback, normalized into a shared schema
- Built the RAG backend in Express.js with Qdrant vector storage and OpenAI embeddings, using Claude for generation; integrated Cloudflare R2 for storage

**Software Engineer Intern – Mazdev** | Jul 2025 – Sep 2025
- Engineered a production chatbot platform (YAML-configurable) used by non-technical users to create 20+ bot variants
- Built a RAG engine (Pinecone) reaching 94% semantic accuracy across a large document set; optimized embeddings to cut latency 45%
- Built an automated testing framework, cutting the QA cycle 50%

**Fullstack Developer – Mazdev** | Mar 2025 – Jun 2025
- Architected an AI-powered legal contract review platform for 40+ enterprise clients, cutting analysis time 60%
- Built a React/Next.js + FastAPI system processing 500+ contract reviews per month at production scale
- Implemented a Docker CI/CD pipeline, cutting infra setup time 75%

## Education

**INSAT – National Institute of Applied Sciences and Technology** | 2022 – Present
Engineering Degree in Software Engineering (EQF Level 7 / Master's equivalent)

## Skills

- **Languages:** Python, JavaScript, TypeScript, Java, SQL
- **Frontend:** React, Next.js, Vue
- **Backend:** FastAPI (Python), NestJS (JavaScript), Express.js (JavaScript), Hono (TypeScript), ASP.NET Core (C#)
- **AI/ML:** LLM Integration, RAG, LangChain, LangGraph, Vector Databases (Qdrant, Pinecone), Embeddings, Prompt Engineering
- **DevOps & Cloud:** Docker, Kubernetes, GitHub Actions, CI/CD, Vercel, Railway, Cloudflare (Pages, R2)
- **Data & Observability:** MongoDB, Supabase, Redis (Upstash), Prometheus, Loki, Kafka
- **Tools:** Git, Linux

## Activities

- Event Mission Leader, Junior Enterprise INSAT (2024–2025)
- Operations Manager, WinterCup 7.0 (2025)