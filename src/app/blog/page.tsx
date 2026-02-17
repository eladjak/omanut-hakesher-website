import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "בלוג",
  description:
    "מאמרים וטיפים בנושאי זוגיות, תקשורת וקשרים בריאים",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            תובנות וכלים
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ה<span className="text-primary">בלוג</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            מאמרים, טיפים ותובנות בנושאי זוגיות, תקשורת וקשרים בריאים
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Featured post - first post gets a larger card */}
          {blogPosts.length > 0 && (
            <Link href={`/blog/${blogPosts[0].slug}`} className="group block mb-12">
              <Card className="overflow-hidden border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image placeholder */}
                  <div className="aspect-[16/9] md:aspect-auto bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15" />

                  <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                        {blogPosts[0].category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{blogPosts[0].readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{blogPosts[0].date}</span>
                      <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        קראו עוד <span>&larr;</span>
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          )}

          {/* Rest of posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full overflow-hidden border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                  {/* Image placeholder */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15" />

                  <CardContent className="p-6">
                    {/* Category & Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <Separator className="my-4" />

                    {/* Date & Read more */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                        קראו עוד <span>&larr;</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">הישארו מעודכנים</h2>
              <p className="text-muted-foreground mb-8">
                הירשמו לניוזלטר וקבלו טיפים, מאמרים ותוכן בלעדי ישירות למייל
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" aria-label="הרשמה לניוזלטר">
                <label htmlFor="newsletter-email-blog" className="sr-only">כתובת אימייל</label>
                <input
                  type="email"
                  id="newsletter-email-blog"
                  placeholder="האימייל שלכם"
                  className="flex-1 px-5 py-3 border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  dir="ltr"
                  autoComplete="email"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors text-sm"
                >
                  הרשמה
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
