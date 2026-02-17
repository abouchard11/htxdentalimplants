"use client";

import Link from "next/link";
import { Star, CheckCircle } from "lucide-react";
import { dentists } from "@/data/dentists";

interface EnrichedReview {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  procedure?: string;
  verified: boolean;
  dentistName: string;
  dentistPractice: string;
  dentistSlug: string;
}

function getTopReviews(): EnrichedReview[] {
  return dentists
    .flatMap((d) =>
      d.reviews.map((r) => ({
        ...r,
        dentistName: d.name,
        dentistPractice: d.practice,
        dentistSlug: d.slug,
      }))
    )
    .sort((a, b) => b.rating - a.rating || b.date.localeCompare(a.date))
    .slice(0, 8);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-current text-accent" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  const reviews = getTopReviews();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
            What Houston Patients Are Saying
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Real reviews from verified dental implant patients
          </p>
        </div>

        {/* Scrollable testimonial row */}
        <div
          className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-[320px] max-w-[380px] shrink-0 rounded-xl border border-border bg-white p-6"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Quote mark */}
              <span className="block font-serif text-4xl leading-none text-primary/20 select-none">
                &ldquo;
              </span>

              {/* Review text */}
              <p className="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">
                {review.text}
              </p>

              {/* Star rating */}
              <div className="mt-4">
                <StarRating rating={review.rating} />
              </div>

              {/* Author + verified badge */}
              <div className="mt-3 flex items-center gap-2">
                <span className="font-heading text-sm font-semibold text-secondary">
                  {review.author}
                </span>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 text-xs text-success">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Verified Patient
                  </span>
                )}
              </div>

              {/* Procedure tag */}
              {review.procedure && (
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-gray-600">
                    {review.procedure}
                  </span>
                </div>
              )}

              {/* Dentist link */}
              <div className="mt-3 border-t border-border pt-3">
                <Link
                  href={`/dentists/${review.dentistSlug}`}
                  className="text-xs text-primary hover:text-primary-dark transition-colors"
                >
                  {review.dentistName}
                  <span className="text-gray-400"> &middot; </span>
                  <span className="text-gray-500">{review.dentistPractice}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom link */}
        <div className="mt-8 text-center">
          <Link
            href="/dentists"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View all dentist reviews &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
