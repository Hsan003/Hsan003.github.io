---
title: "Designing a multi-agent system for Kubernetes incident analysis"
date: TODO_PUBLISH_DATE
summary: "The architecture behind KubeMind: specialized LangGraph agents that correlate Kubernetes events, logs and metrics to support incident investigation."
tags: [Kubernetes, LangGraph, AIOps, Kafka, Observability]
draft: true
---

> **TODO:** One-paragraph intro: what KubeMind is (my final-year project) and who it is for.

## The problem: alert fatigue and root-cause analysis

- Troubleshooting a Kubernetes incident means jumping between events, application logs and resource metrics in different tools.
- Connecting those signals by hand is slow and makes the root cause harder to find.
- **TODO:** your framing of alert fatigue, and a short real or simulated incident to anchor the article.

## Architecture

- **Event flow:** Kubernetes events are captured and published to Kafka (`kube-events` topic) for downstream analysis.
- **Metrics:** Prometheus.
- **Logs:** Loki, with Promtail shipping container logs.
- **Agents:** LangChain and LangGraph orchestrate specialized agents with a shared incident state.
- **Storage and UI:** MongoDB for incident data and analysis results; a Next.js dashboard for investigations and reports.
- **TODO:** architecture diagram.

## Agent roles and orchestration

- One specialized agent each for Kubernetes events, logs and metrics.
- A correlation agent that combines their findings into a single investigation.
- LangGraph coordinates execution and holds the shared incident state.
- **TODO:** the graph itself (nodes, edges, when agents run in parallel vs in sequence) and why you chose this shape.

## Grounding agents in observability data

- Agents work from the actual signals (events, Loki logs, Prometheus metrics) rather than from the model's general knowledge.
- **TODO:** how each agent queries its data source, how much context it receives, and how findings cite the evidence they rely on.

## Evaluation

- Tested against failure scenarios including CrashLoopBackOff, ImagePullBackOff and OOMKilled pods.
- Evaluated across three controlled incident scenarios, comparing OpenAI, Gemini and Ollama-based models.
- **TODO:** evaluation criteria and the results you measured. Do not include numbers you have not measured.

## Limitations and next steps

- **TODO:** current limitations (scenario coverage, model behaviour, cost or latency) and what you would build next.
