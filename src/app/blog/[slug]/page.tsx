import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogSlugs, blogPosts } from "@/lib/blog-posts";

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
      title: "מאמר לא נמצא | אומנות הקשר",
    };
  }

  return {
    title: `${post.title} | אומנות הקשר`,
    description: post.excerpt,
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
      {/* Hero */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <Link href="/blog" className="text-muted-foreground hover:text-primary">
                בלוג
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-foreground">{post.title}</span>
            </nav>

            {/* Category & Meta */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              <span className="text-muted-foreground text-sm">{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>

            {/* Date */}
            <p className="text-muted-foreground">{post.date}</p>
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
                  .replace(/^❌ (.*$)/gm, '<p class="text-red-600 mb-2">❌ $1</p>')
                  .replace(/^✅ (.*$)/gm, '<p class="text-green-600 mb-2">✅ $1</p>')
                  .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground">')
                  .replace(/^([^<].*[^>])$/gm, '<p class="mb-4 text-muted-foreground">$1</p>')
              }}
            />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">מאמרים נוספים שיעניינו אתכם</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group p-6 bg-background rounded-xl hover:shadow-md transition-shadow"
                  >
                    <span className="text-sm text-primary">{relatedPost.category}</span>
                    <h3 className="text-lg font-semibold mt-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            רוצים ליישם את הכלים האלה בקשר שלכם?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            בואו נדבר על איך אפשר לעזור לכם לבנות תקשורת טובה יותר
          </p>
          <Link
            href="/contact"
            className="inline-flex px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-muted transition-colors"
          >
            לקביעת פגישה
          </Link>
        </div>
      </section>
    </>
  );
}
