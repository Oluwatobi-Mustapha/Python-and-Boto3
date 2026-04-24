"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { TrackedAnchor } from "./TrackedAnchor";

type ArticleItem = {
  publication: string;
  title: string;
  description: string;
  meta: string;
  href: string;
};

export function ArticlesSection({ articles }: { articles: ArticleItem[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = useMemo(() => {
    const publications = Array.from(new Set(articles.map((article) => article.publication)));
    const topics = Array.from(new Set(articles.map((article) => article.meta))).slice(0, 4);
    return ["All", ...publications, ...topics];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (activeFilter === "All") {
      return articles;
    }
    return articles.filter(
      (article) => article.publication === activeFilter || article.meta === activeFilter,
    );
  }, [activeFilter, articles]);

  return (
    <>
      <div className="section-filter-row" role="tablist" aria-label="Article filters">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`section-filter-chip${activeFilter === filter ? " is-active" : ""}`}
            onClick={() => setActiveFilter(filter)}
            role="tab"
            aria-selected={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="article-stack-reference">
        {filteredArticles.map((article) => (
          <TrackedAnchor
            key={article.title}
            href={article.href}
            className="article-row-reference"
            eventName="article_click"
            eventData={{
              title: article.title,
              publication: article.publication,
              placement: "articles_section",
            }}
          >
            <div className="article-publication-reference">
              {article.publication === "Medium" || article.publication === "LinkedIn" ? (
                <span className={`brand-mark-badge brand-mark-badge-article ${article.publication === "Medium" ? "brand-mark-badge-medium" : "brand-mark-badge-linkedin"}`}>
                  <Image
                    src={article.publication === "Medium" ? "/logos/medium-mark.svg" : "/logos/linkedin-mark-black.svg"}
                    alt={article.publication === "Medium" ? "Medium logo" : "LinkedIn logo"}
                    width={24}
                    height={24}
                    className="pub-pill-image"
                  />
                </span>
              ) : (
                <span className="article-publication-pill">{article.publication}</span>
              )}
            </div>
            <div className="article-body-reference">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <div className="article-meta-reference">
              <span>{article.meta}</span>
              <span className="article-read">Read on {article.publication}</span>
            </div>
          </TrackedAnchor>
        ))}
      </div>
    </>
  );
}
