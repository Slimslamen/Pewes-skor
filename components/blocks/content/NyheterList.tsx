"use client";

import Image from "next/image";
import { useState } from "react";
import PostModal, { type PostModalData } from "./PostModal";
import Reveal from "../Reveal";

export interface NyhetCard {
  title:       string;
  slug:        string;
  publishedAt: string;
  season:      string;
  excerpt:     string;
  body?:       string;
  coverImage?: { url?: string; alt?: string } | null;
}

interface Props {
  posts: NyhetCard[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

function toModalData(post: NyhetCard): PostModalData {
  return {
    title:     post.title,
    imageUrl:  post.coverImage?.url,
    imageAlt:  post.coverImage?.alt ?? post.title,
    badge:     post.season,
    dateLabel: formatDate(post.publishedAt),
    excerpt:   post.excerpt,
    body:      post.body,
  };
}

export default function NyheterList({ posts }: Props) {
  const [selected, setSelected] = useState<NyhetCard | null>(null);
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Featured post */}
      <Reveal className="mb-20">
      <button
        type="button"
        onClick={() => setSelected(featured)}
        className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-500 bg-surface-container-low text-left w-full"
      >
        <div className="relative aspect-16/10 lg:aspect-auto lg:min-h-120 overflow-hidden">
          {featured.coverImage?.url ? (
            <Image
              src={featured.coverImage.url}
              alt={featured.coverImage.alt ?? featured.title}
              fill
              priority
              className="object-cover transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-surface-container" />
          )}
          <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest">
            {featured.season}
          </div>
        </div>

        <div className="flex flex-col justify-center p-10 lg:p-14">
          <p className="font-(family-name:--font-inter) text-xs text-outline mb-4">
            {formatDate(featured.publishedAt)}
          </p>
          <h2 className="font-(family-name:--font-manrope) text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-5 group-hover:text-primary transition-colors duration-300">
            {featured.title}
          </h2>
          <p className="text-secondary font-light leading-relaxed mb-8 line-clamp-4">
            {featured.excerpt}
          </p>
          <span className="inline-flex items-center gap-2 font-(family-name:--font-manrope) text-xs font-bold uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors">
            Utforska kollektion
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </button>
      </Reveal>

      {/* Remaining posts */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.1}>
            <button
              type="button"
              onClick={() => setSelected(post)}
              className="group overflow-hidden rounded-xl bg-surface-container-low shadow-sm hover:shadow-lg transition-shadow duration-500 text-left w-full"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                {post.coverImage?.url ? (
                  <Image
                    src={post.coverImage.url}
                    alt={post.coverImage.alt ?? post.title}
                    fill
                    className="object-cover transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container" />
                )}
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                  {post.season}
                </div>
              </div>
              <div className="p-8">
                <p className="text-xs text-outline mb-3">
                  {formatDate(post.publishedAt)}
                </p>
                <h3 className="font-(family-name:--font-manrope) text-xl font-bold text-on-surface tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-secondary font-light text-sm leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-outline group-hover:text-primary transition-colors font-(family-name:--font-manrope)">
                  Utforska
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </button>
            </Reveal>
          ))}
        </div>
      )}

      <PostModal
        post={selected ? toModalData(selected) : null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
