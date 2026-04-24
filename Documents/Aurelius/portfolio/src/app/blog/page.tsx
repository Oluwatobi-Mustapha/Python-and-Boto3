import Link from "next/link";
import { blogPosts } from "../../content/identrailBlogPosts";

export const metadata = {
  title: "Identrail Blog | Machine Identity Security Guides",
  description:
    "Actionable content for security and platform teams operating machine identities.",
};

export default function BlogIndexPage() {
  return (
    <main className="blog-shell">
      <section className="blog-hero">
        <p className="blog-kicker">Blog & Resources</p>
        <h1>Actionable content for security and platform teams operating machine identities</h1>
        <p>
          Educational deep dives, implementation playbooks, and strategic guidance for enterprise buyers.
        </p>
      </section>

      <section className="blog-grid" aria-label="Blog posts">
        {blogPosts.map((post) => (
          <article key={post.slug} className="blog-card">
            <p className="blog-card-meta">{post.category} • {post.readTime}</p>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.articleDescription}</p>
            <Link href={`/blog/${post.slug}`} className="blog-read-link">Read article</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
