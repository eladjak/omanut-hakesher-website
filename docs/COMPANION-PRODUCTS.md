# Companion products registry

`data/companion-products.json` is the public-safe source of truth for the 31 companion products and supporting assets currently known across the Omanut HaKesher ecosystem.

It answers a narrow set of questions: what the item is, its measured local status, its canonical owner and surface, the related core product, and whether access requires an entitlement. It is not a commerce catalog, customer ledger, proof library, deployment record or authorization grant.

## Status vocabulary

- `available` — an existing public route or asset is connected in this repository.
- `beta` — meaningful local implementation exists, but product or environment acceptance remains open.
- `contained` — source may exist, but access is deliberately closed or the product is not safe to activate.
- `planned` — a bounded product idea or missing connection, not an availability promise.
- `archive` — historical/reference material, not a deliverable.

## Public connections

The registry connects only existing public website routes and the following three open assets:

- `/downloads/courage.pdf`
- `/downloads/vision.pdf`
- `/downloads/dating-talks.pdf`

Protected book tools, course PDFs, LMS routes, commerce and community access are described but have no public target in this registry.

## Gates

Run with Node 22:

```powershell
node --experimental-strip-types scripts/validate-companion-products.mjs
node --experimental-strip-types scripts/test-companion-products.mjs
```

The validator fails on duplicate IDs/routes/assets, an `available` item without a route or asset, protected items without a named entitlement, protected targets exposed in the website registry, missing route sources or assets, and any unapproved or sensitive field. The only approved asset set is the three open PDFs above.
