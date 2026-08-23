# Testimonial proof archive

This directory contains historical testimonial media that used to live under
`public/`, together with the historical raw JSON that used to live under
`src/data/`. It is intentionally outside the deployable source and public
asset trees.

Do not copy an item back to `public/` merely because it appeared on an older
site or exists in this archive. Publication requires an
item-level entry in `src/lib/testimonial-publication-policy.ts` with:

- a verified source;
- current consent for each named surface;
- approved wording and context;
- a SHA-256 fingerprint of the approved content;
- a SHA-256 fingerprint of the media asset when one is published.

Only the specifically approved public DTO and asset should be generated back
into `src/generated/` and `public/`. The rest of this archive must remain
non-public and excluded from deployment.
