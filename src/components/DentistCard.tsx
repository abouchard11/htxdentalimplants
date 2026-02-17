import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, CheckCircle, Phone, Award } from "lucide-react";
import type { Dentist } from "@/data/dentists";

export default function DentistCard({ dentist }: { dentist: Dentist }) {
  return (
    <div className="card-hover rounded-xl border border-border bg-white p-5">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <Image
            src={dentist.imageUrl}
            alt={`${dentist.name} - ${dentist.practice}`}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                href={`/dentists/${dentist.slug}`}
                className="text-base font-heading font-bold text-secondary hover:text-primary transition-colors"
              >
                {dentist.name}
                {dentist.isVerified && (
                  <CheckCircle className="inline-block ml-1 h-4 w-4 text-primary" />
                )}
              </Link>
              <p className="text-sm text-gray-500 mt-0.5">{dentist.practice}</p>
            </div>
            {dentist.isFeatured && (
              <span className="shrink-0 inline-flex items-center rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-medium text-amber-800">
                Featured
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-0.5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(dentist.rating) ? "fill-current" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">{dentist.rating}</span>
            <span className="text-sm text-gray-500">({dentist.reviewCount} reviews)</span>
          </div>

          {/* Description */}
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{dentist.description}</p>

          {/* Differentiators */}
          {dentist.differentiators && dentist.differentiators.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {dentist.differentiators.slice(0, 3).map((diff) => (
                <span
                  key={diff}
                  className="inline-flex items-center gap-1 rounded-full bg-accent-light/40 px-2 py-0.5 text-xs font-medium text-amber-800"
                >
                  <Award className="h-3 w-3" />
                  {diff}
                </span>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {dentist.specialties.slice(0, 3).map((spec) => (
              <span
                key={spec}
                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-gray-600"
              >
                {spec}
              </span>
            ))}
            {dentist.specialties.length > 3 && (
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-gray-400">
                +{dentist.specialties.length - 3}
              </span>
            )}
          </div>

          {/* Bottom row */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5" />
              <span>{dentist.address.split(",").slice(-2).join(",").trim()}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${dentist.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
              >
                <Phone className="h-3 w-3" />
                Call
              </a>
              <Link
                href={`/dentists/${dentist.slug}`}
                className="inline-flex items-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-white hover:bg-primary-dark transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
