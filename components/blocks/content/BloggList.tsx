"use client";

import Image from "next/image";
import { useState } from "react";
import PostModal, { type PostModalData } from "./PostModal";
import Reveal from "../Reveal";

export interface BlogPost {
  slug:     string;
  category: string;
  date:     string;
  title:    string;
  excerpt:  string;
  body:     string;
  imageUrl: string;
  imageAlt: string;
}

interface Props {
  posts: BlogPost[];
}

function toModalData(post: BlogPost): PostModalData {
  return {
    title:     post.title,
    imageUrl:  post.imageUrl,
    imageAlt:  post.imageAlt,
    badge:     post.category,
    dateLabel: post.date,
    excerpt:   post.excerpt,
    body:      post.body,
  };
}

export default function BloggList({ posts }: Props) {
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Featured post — full width */}
      <Reveal className="mb-20">
      <button
        type="button"
        onClick={() => setSelected(featured)}
        className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-500 bg-surface-container-low text-left w-full"
      >
        <div className="relative aspect-16/10 lg:aspect-auto lg:min-h-105 overflow-hidden">
          <Image
            src={featured.imageUrl}
            alt={featured.imageAlt}
            fill
            className="object-cover transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center p-10 lg:p-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              {featured.category}
            </span>
            <span className="text-xs text-outline">{featured.date}</span>
          </div>
          <h2 className="font-(family-name:--font-manrope) text-3xl md:text-4xl font-bold text-on-surface tracking-tight leading-tight mb-5 group-hover:text-primary transition-colors duration-300">
            {featured.title}
          </h2>
          <p className="text-secondary font-light leading-relaxed mb-8">
            {featured.excerpt}
          </p>
          <span className="inline-flex items-center gap-2 font-(family-name:--font-manrope) text-xs font-bold uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors">
            Läs mer <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </button>
      </Reveal>

      {/* Remaining posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 2) * 0.1}>
          <button
            type="button"
            onClick={() => setSelected(post)}
            className="group overflow-hidden rounded-xl bg-surface-container-low shadow-sm hover:shadow-lg transition-shadow duration-500 text-left w-full"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                fill
                className="object-cover transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-outline">{post.date}</span>
              </div>
              <h3 className="font-(family-name:--font-manrope) text-xl font-bold text-on-surface tracking-tight leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-secondary font-light text-sm leading-relaxed line-clamp-3 mb-6">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 font-(family-name:--font-manrope) text-xs font-bold uppercase tracking-widest text-outline group-hover:text-primary transition-colors">
                Läs mer <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </button>
          </Reveal>
        ))}
      </div>

      <PostModal
        post={selected ? toModalData(selected) : null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
