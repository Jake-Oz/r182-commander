# Seed Data Structure

Seed data is separated from application logic so aircraft content can be reviewed, versioned, and traced independently.

Use one directory per domain entity:

```text
data/seed/
├── aircraft/
├── competencies/
├── knowledge-items/
├── lessons/
├── missions/
├── scenarios/
└── sources/
```

Recommended file format:

- `*.json` for small curated records.
- `*.jsonl` for larger extraction batches.
- Keep source references beside the content they verify, or in `sources/` when reused by multiple records.

Rules:

- Do not store aircraft facts without source metadata.
- Do not duplicate factual text across lessons or scenarios; reference Knowledge Items.
- Do not seed unverified content into assessment or scenario flows.
