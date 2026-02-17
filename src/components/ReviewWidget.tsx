"use client";

import { useState, useMemo } from "react";
import { Star, CheckCircle } from "lucide-react";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  procedure?: string;
  verified: boolean;
}

interface ReviewWidgetProps {
  reviews: Review[];
  dentistName: string;
  rating: number;
  reviewCount: number;
  compact?: boolean;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${
            i < Math.floor(rating)
              ? "fill-current text-accent"
              : i < rating
                ? "fill-current text-accent opacity-50"
                : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-white p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-secondary">{review.author}</span>
            {review.verified && (
              <span className="inline-flex items-center gap-0.5 text-xs text-success">
                <CheckCircle className="h-3.5 w-3.5" />
                Verified
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={review.rating} />
            <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
          </div>
        </div>
        {review.procedure && (
          <span className="shrink-0 inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-gray-600">
            {review.procedure}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="mt-2.5">
        <p
          className={`text-sm text-gray-600 leading-relaxed ${
            !expanded ? "line-clamp-3" : ""
          }`}
        >
          {review.text}
        </p>
        {review.text.length > 180 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ReviewWidget({
  reviews,
  dentistName,
  rating,
  reviewCount,
  compact = false,
}: ReviewWidgetProps) {
  const initialCount = compact ? 2 : 3;
  const [visibleCount, setVisibleCount] = useState(initialCount);

  // Calculate rating distribution from the reviews array
  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]; // index 0 = 1 star, index 4 = 5 star
    for (const review of reviews) {
      const bucket = Math.min(Math.max(Math.round(review.rating), 1), 5);
      counts[bucket - 1]++;
    }
    const total = reviews.length || 1;
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: counts[stars - 1],
      pct: Math.round((counts[stars - 1] / total) * 100),
    }));
  }, [reviews]);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <div className="rounded-xl border border-border bg-white p-5">
      {/* Overall rating header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        {/* Left: big number + stars */}
        <div className="flex flex-col items-center text-center sm:min-w-[120px]">
          <span className="text-5xl font-heading font-bold text-secondary leading-none">
            {rating.toFixed(1)}
          </span>
          <div className="mt-2">
            <StarRating rating={rating} size="lg" />
          </div>
          <span className="mt-1.5 text-sm text-gray-500">
            {reviewCount} review{reviewCount !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Right: distribution bars */}
        {!compact && (
          <div className="flex-1 space-y-1.5">
            {distribution.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-12 text-xs text-gray-500 text-right">
                  {stars} star{stars !== 1 ? "s" : ""}
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-xs text-gray-400 text-right">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review list */}
      {reviews.length > 0 && (
        <div className="mt-5 space-y-3">
          <h3 className="text-sm font-heading font-semibold text-secondary">
            Patient Reviews for {dentistName}
          </h3>
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Show more button */}
      {hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
          >
            Show more reviews
          </button>
        </div>
      )}
    </div>
  );
}
