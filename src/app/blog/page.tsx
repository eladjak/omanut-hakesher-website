import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "בלוג | אומנות הקשר",
  description:
    "מאמרים וטיפים בנושאי זוגיות, תקשורת וקשרים בריאים",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            ה<span className="text-primary">בלוג</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            מאמרים, טיפים ותובנות בנושאי זוגיות, תקשורת וקשרים בריאים
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Placeholder Image */}
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />

                <div className="p-6">
                  {/* Category & Meta */}
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Date & Link */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {post.date}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary font-medium hover:underline"
                    >
                      קראו עוד ←
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">הישארו מעודכנים</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            הירשמו לניוזלטר וקבלו טיפים ותוכן בלעדי ישירות למייל
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="האימייל שלכם"
              className="flex-1 px-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              dir="ltr"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
            >
              הרשמה
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
