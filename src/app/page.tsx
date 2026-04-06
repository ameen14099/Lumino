import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import FeaturedBook from '@/components/home/FeaturedBook';
import ModesShowcase from '@/components/home/ModesShowcase';
import BookGrid from '@/components/home/BookGrid';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedBook />
        <ModesShowcase />
        <BookGrid />
        <CTASection />
      </main>
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-sm font-bold">Lumino</span>
            </div>
            <p className="text-xs text-muted">
              Lumino teaches concepts from books using AI. All explanations are original — never reproducing book text.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
