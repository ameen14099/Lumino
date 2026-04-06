import { notFound } from 'next/navigation';
import { getBookBySlug, books } from '@/data/books';
import Header from '@/components/layout/Header';
import BookExperience from '@/components/book/BookExperience';

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return books.map(book => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: 'Book Not Found' };

  return {
    title: `${book.title} by ${book.author} — Lumino`,
    description: `Experience ${book.title} interactively. Visual concept maps, AI mentor conversations, gamified challenges, and personalized action plans.`,
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <BookExperience book={book} />
      </main>
    </>
  );
}
