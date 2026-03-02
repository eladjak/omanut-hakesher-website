# Scraped Content - Omanut HaKesher RavMesser Landing Pages

## Scraping Status (2026-02-27)

### CRITICAL FINDING: All RavMesser Landing Pages Are DOWN

The domain `omanut-hakesher.ravpage.co.il` (note: `.ravpage.co.il`, not `.ravmesser.co.il`)
returns a **custom 404 page** from the RavMesser platform for ALL URLs:

- "אוף, הדף שחיפשת לא קיים" (Oops, the page you searched for does not exist)
- "אבל בכל רגע עולים עשרות דפי נחיתה חדשים לרב מסר, אולי הדף הבא יהיה שלך?"

### Verification Details
- HTTP status: 200 (but content is RavMesser's generic 404 page)
- Thank-you pages: Return HTTP 403 (Cloudflare block)
- Root URL `/`: Also 404
- DNS: The domain resolves via Cloudflare
- Wayback Machine: No archived snapshots exist
- Google Index: No indexed pages found

### Alternative Sources Used
Content was gathered from:
1. **ohlove.co.il** - The main Wix website (dynamically rendered, limited static extraction)
2. **bizmakebiz.co.il** - Business directory profile
3. **podcastim.org.il** - Podcast directory listing
4. **podcast.app** - Podcast listing
5. **Web search results** - Various snippets and descriptions
6. **Existing codebase** - Content already in the project (src/app pages, blog-posts.ts)

### File Organization
Each file contains:
- **[REAL]** - Verified content from public sources
- **[FROM CODEBASE]** - Content already in the project (may be placeholder/AI-generated)
- **[RECONSTRUCTED]** - Content reconstructed from search snippets and descriptions
- **[UNAVAILABLE]** - Content that could not be retrieved

### Recommendation
To get the original RavMesser page content, ask the business owner (Elad Yakubowitz)
if he has:
1. Backups of the RavMesser landing pages
2. Screenshots or PDFs of the pages
3. The original copy documents used to create the pages
4. Access to the RavMesser admin panel to republish them temporarily
