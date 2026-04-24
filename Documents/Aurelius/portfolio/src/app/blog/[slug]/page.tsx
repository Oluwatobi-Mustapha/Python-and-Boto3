import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "../../../content/identrailBlogPosts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: `${post.title} | Identrail Blog`,
    description: post.articleDescription,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blog-shell">
      <article className="blog-article">
        <Link href="/blog" className="blog-back-link">← Back to blog</Link>
        <p className="blog-card-meta">{post.category} • {post.readTime}</p>
        <h1>{post.title}</h1>
        <p className="blog-summary">{post.summary}</p>

        {post.sections.map((section) => (
          <section key={section.heading} className="blog-article-section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <section className="blog-article-section blog-identrail-fit">
          <h2>How Identrail comes in</h2>
          <ul>
            {post.identrailFit.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="blog-article-section">
          <h2>References</h2>
          <ul>
            {post.references.map((reference) => (
              <li key={reference.href}>
                <a href={reference.href} target="_blank" rel="noreferrer">{reference.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
