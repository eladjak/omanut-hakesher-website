import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, blogPosts } from "@/lib/blog-posts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
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

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "בית", url: "https://omanut-hakesher.co.il" },
          { name: "בלוג", url: "https://omanut-hakesher.co.il/blog" },
          { name: post.title, url: `https://omanut-hakesher.co.il/blog/${slug}` },
        ]}
      />

      {/* Breadcrumbs */}
      <div className="bg-muted/50 border-b border-border/30">
        <Breadcrumbs items={[{ label: "בלוג", href: "/blog" }, { label: post.title }]} />
      </div>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Category & Meta */}
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-sm">
                {post.category}
              </Badge>
              <span className="text-muted-foreground text-sm">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>

            {/* Date */}
            <time className="text-muted-foreground">{post.date}</time>
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
                  .replace(/^\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
                  .replace(/^- (.*$)/gm, '<li class="ms-6 mb-2">$1</li>')
                  .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc mb-6">$&</ul>')
                  .replace(/^[^\S\r\n]*\u274C (.*$)/gm, '<p class="text-red-600 dark:text-red-400 mb-2">\u274C $1</p>')
                  .replace(/^[^\S\r\n]*\u2705 (.*$)/gm, '<p class="text-green-600 dark:text-green-400 mb-2">\u2705 $1</p>')
                  .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground">')
                  .replace(/^([^<].*[^>])$/gm, '<p class="mb-4 text-muted-foreground">$1</p>')
              }}
            />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">מאמרים נוספים שיעניינו אתכם</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <Card className="h-full border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-200">
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
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
            רוצים ליישם את הכלים האלה בקשר שלכם?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
            בואו נדבר על איך אפשר לעזור לכם לבנות תקשורת טובה יותר
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-muted transition-colors shadow-lg"
          >
            לקביעת פגישה
          </Link>
        </div>
      </section>
    </>
  );
}
