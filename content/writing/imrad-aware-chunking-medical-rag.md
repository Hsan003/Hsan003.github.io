---
title: "Chunking scientific papers: IMRAD-aware chunking for a medical RAG system"
date: TODO_PUBLISH_DATE
summary: "How AskSahera turns PubMed abstracts and GROBID-parsed PDFs into section-aware chunks, and why naive fixed-size chunking is a poor fit for research papers."
tags: [RAG, Chunking, GROBID, PubMed, Qdrant]
draft: true
---

> **TODO:** One-paragraph intro: what AskSahera is (a bilingual FR/EN health-education assistant built at Applicare that answers from peer-reviewed literature), and the question this article answers: how should scientific papers be split before they are embedded?

## Why naive chunking fails on papers

- Fixed-size windows cut across section boundaries, so a chunk can mix the end of *Methods* with the start of *Results*.
- Clinical results often live only in tables, which embed poorly as raw grids of numbers.
- PDF extraction leaves noise behind: captions repeated in body text, citation markers like `[17]`, stray periods and tiny fragments.
- **TODO:** a concrete example from the corpus of a bad chunk (anonymised if needed).

## Two sources: PubMed XML vs GROBID PDF parsing

- **PubMed (abstracts only):** MeSH-based query, EFetch XML, structured abstracts (*Background / Methods / Results…*) and unstructured ones mapped to `{title, text}` entries.
- **Full-text PDFs:** sent to a self-hosted GROBID service, which returns TEI XML with the section hierarchy, references, tables and figures.
- Why both: abstracts give broad coverage; full text gives the details that only appear in the body and tables.
- **TODO:** the trade-offs you saw between the two sources (quality, coverage, failure cases).

## IMRAD-aware chunking

- Body text is chunked **section by section**, following the paper's structure (Introduction / Methods / Results / Discussion), and a chunk never mixes two sections.
- Each chunk keeps its `sectionType`, `sectionTitle` and `level` in the payload.
- Short abstracts stay as a single chunk, since splitting them hurt retrieval.
- Tables get an LLM-written prose summary at extraction time, stored with the article so re-indexing never repeats the cost.
- **TODO:** a diagram or example showing one paper split into section-aware chunks.

## Sliding-window fallback

- Inside a section, a recursive character splitter acts as a sliding window: 2,000 characters (~500 tokens) with 15% overlap.
- Separators are tried in order: heading → paragraph → line → sentence → clause → word.
- Post-processing: fragments under 120 characters are merged into the previous chunk, and a sentence duplicated by the overlap is trimmed at the boundary.
- **TODO:** how documents without a clear IMRAD structure are handled in practice, and an example.

## The normalized schema

- Both parsers go through one validated `Article` factory: metadata (title, DOI, PMID, year, journal, authors, source, domain), abstract, sections, references, tables, figures.
- A malformed document fails at parse time instead of silently during chunking.
- Because chunking, embedding and indexing only see the shared schema, they are fully source-agnostic.
- **TODO:** a trimmed JSON example of one normalized article.

## Retrieval impact

- Retrieval side, for context: top-20 per thematic domain in Qdrant, merged with Reciprocal Rank Fusion, then reranked to the top 5 passages.
- **TODO:** what changed in retrieval quality after switching to section-aware chunks. Only include numbers you have actually measured (e.g. from the evaluation script); otherwise describe qualitative observations.

## Lessons learned

- **TODO:** 3–5 takeaways, for example on keeping extraction and indexing as separate steps, on table summaries, and on what you would do differently.
