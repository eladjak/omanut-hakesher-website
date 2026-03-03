import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, blogPosts } from "@/lib/blog-posts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbJsonLd, ArticleJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "מאמר לא נמצא",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "he_IL",
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  // If no same-category, just grab 2 other posts
  const fallbackRelated = relatedPosts.length > 0
    ? relatedPosts
    : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://omanut-hakesher.co.il" },
          { name: "בלוג", url: "https://omanut-hakesher.co.il/blog" },
          { name: post.title, url: `https://omanut-hakesher.co.il/blog/${slug}` },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`https://omanut-hakesher.co.il/blog/${slug}`}
        datePublished={post.date}
        category={post.category}
      />

      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "בלוג", href: "/blog" }, { label: post.title }]} />
      </div>

      {/* Hero with real image */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 md:pb-16">
            <div className="max-w-3xl">
              {/* Category & Meta */}
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-white border-0 text-sm">
                  {post.category}
                </Badge>
                <span className="text-white/70 text-sm">{post.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                {post.title}
              </h1>

              {/* Date */}
              <time className="text-white/60 text-sm">{post.date}</time>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
            {/* Render markdown content as HTML */}
            <div
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-10 mb-4 text-foreground">$1</h2>')
                  .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-8 mb-3 text-foreground">$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^- (.*$)/gm, '<li class="ms-6 mb-2">$1</li>')
                  .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc mb-6">$&</ul>')
                  .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground">')
                  .replace(/^([^<].*[^>])$/gm, '<p class="mb-4 text-muted-foreground">$1</p>')
              }}
            />
          </div>
        </div>
      </article>

      {/* Author CTA bar */}
      <section className="py-12 bg-muted/30 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/30">
              <Image
                src="/assets/elad-photos/elad-2025-portrait.jpg"
                alt="אלעד יעקובוביץ"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-right flex-1">
              <p className="font-bold text-lg">אלעד יעקובוביץ&apos;</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                מאמן זוגיות עם 20 שנות ניסיון. 461 זוגות כבר מצאו אהבה עם הגישה שלי.
              </p>
            </div>
            <Link
              href="/coaching"
              className="flex-shrink-0 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors text-sm whitespace-nowrap"
            >
              לליווי אישי
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {fallbackRelated.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">מאמרים נוספים שיעניינו אותכם</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {fallbackRelated.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                        <Separator className="my-4" />
                        <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                          קראו עוד <span>&larr;</span>
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            רוצים ליישם את הכלים האלה?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            בואו נדבר על הדרך שלכם לזוגיות. שיחת היכרות ראשונה - ללא עלות
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לקביעת שיחת היכרות
          </Link>
        </div>
      </section>
    </>
  );
}
