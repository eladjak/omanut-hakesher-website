import {toHTML} from '@portabletext/to-html';
import sanitize from 'sanitize-html';
import {blogPosts, type BlogPost} from './blog-posts';

export type UnifiedPost = BlogPost & {publishedAt: string; contentHtml?: string; author?: string};
const months: Record<string,string> = {'ינואר':'01','פברואר':'02'};
const local = (): UnifiedPost[] => blogPosts.map(p => { const m = p.date.match(/^(\d+) ב(\S+) (\d{4})$/); return {...p, publishedAt: m && months[m[2]] ? `${m[3]}-${months[m[2]]}-${m[1].padStart(2,'0')}T00:00:00Z` : '1970-01-01T00:00:00Z'}; });
const imageSafe = (s: unknown): s is string => typeof s === 'string' && /^https:\/\/cdn\.sanity\.io\/images\/b0hm1i34\/production\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|avif)(\?[^#]*)?$/i.test(s);
const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
export function portableHtml(body: Parameters<typeof toHTML>[0]) { return sanitize(toHTML(body, {onMissingComponent:false, components:{types:{image: ({value}) => imageSafe(value.assetUrl) ? `<figure><img src="${esc(value.assetUrl)}" alt="${esc(value.alt || '')}"></figure>` : ''}}}), {allowedTags:['p','br','h2','h3','h4','ul','ol','li','blockquote','strong','em','a','figure','img'],allowedAttributes:{a:['href','title'],img:['src','alt']},allowedSchemes:['http','https','mailto'],allowProtocolRelative:false}); }
const query = `*[_type == "post" && siteId == "omanut-hakesher" && status == "published" && !(_id in path("drafts.**")) && (language == "he" || !defined(language))]{_id,status,language,title,"slug":slug.current,excerpt,publishedAt,tags,"body":body[]{...,"assetUrl":asset->url},"imageUrl":mainImage.asset->url,"author":author->name}`;
export async function getPublishedPosts(): Promise<UnifiedPost[]> {
 const fallback=local();
 try {
  const r=await fetch(`https://b0hm1i34.api.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(query)}`,{next:{revalidate:300},signal:AbortSignal.timeout(5000)});
  if(!r.ok) throw new Error(`Sanity ${r.status}`); const {result}=await r.json(); if(!Array.isArray(result)) throw new Error('Invalid response');
  const map=new Map(fallback.map(p=>[p.slug,p]));
  for(const p of result) {
   if(!p || typeof p._id !== 'string' || p._id.startsWith('drafts.') || p.status !== 'published' || (p.language || 'he') !== 'he' || typeof p.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || typeof p.title !== 'string' || !p.title.trim() || typeof p.publishedAt !== 'string' || Number.isNaN(Date.parse(p.publishedAt)) || !Array.isArray(p.body)) continue;
   const contentHtml=portableHtml(p.body); if(!contentHtml.trim()) continue;
   map.set(p.slug,{author:typeof p.author === "string" ? p.author : undefined,slug:p.slug,title:p.title,excerpt:typeof p.excerpt==='string' && p.excerpt.trim() ? p.excerpt : p.title,content:'',contentHtml,date:new Intl.DateTimeFormat('he',{dateStyle:'long'}).format(new Date(p.publishedAt)),publishedAt:p.publishedAt,readTime:`${Math.max(1,Math.ceil(contentHtml.replace(/<[^>]+>/g,' ').split(/\s+/).length/200))} דקות קריאה`,category:Array.isArray(p.tags) && typeof p.tags[0]==='string' ? p.tags[0] : 'זוגיות', image:imageSafe(p.imageUrl) ? p.imageUrl : '/images/generated/blog-hero.jpg'});
  }
  return [...map.values()].sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
 } catch(e) {console.error('Sanity blog unavailable',e);return fallback.sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));}
}
export function blogJsonLd(p: UnifiedPost, origin: string) { return JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,description:p.excerpt,datePublished:p.publishedAt,author:{'@type':'Person',name:p.author || 'אלעד יעקובוביץ׳'},inLanguage:'he',mainEntityOfPage:`${origin}/blog/${p.slug}`,image:p.image.startsWith('https://')?p.image:`${origin}${p.image}`}).replace(/</g,'\\u003c'); }
