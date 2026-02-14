"use client";

import Link from "next/link";
import { type Business } from "@/actions/business";
import { cn } from "@/lib/utils";
import { COLORS } from "@/constants/colors";
import { DUMMY_BUSINESSES } from "@/data/dummyBusinesses";

const APP_GRADIENT = `linear-gradient(135deg, ${COLORS.GRADIENT_START} 0%, ${COLORS.GRADIENT_END} 100%)`;

function BusinessCard({ business }: { business: Business }) {
  const heroImage = business.images?.[0] || "";

  return (
    <Link
      href={`/local-business/${business.id}`}
      className={cn(
        "group block rounded-2xl overflow-hidden shadow-lg border border-gray-200",
        "bg-white transition-shadow hover:shadow-xl hover:border-red-200"
      )}
    >
      <div
        className="h-1.5 w-full shrink-0"
        style={{ background: APP_GRADIENT }}
      />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-80 lg:w-96 shrink-0">
          <div className="relative h-52 md:h-full md:min-h-[240px] bg-gray-100">
            {heroImage ? (
              <img
                src={heroImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center text-4xl text-gray-400"
                style={{ background: APP_GRADIENT }}
              >
                🏢
              </div>
            )}
            <span
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow"
              style={{ background: COLORS.GRADIENT_END }}
            >
              Sample
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {business.businessName}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span
                  className="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ background: COLORS.GRADIENT_START }}
                >
                  {business.businessType}
                </span>
                <span className="text-sm text-gray-500 capitalize">
                  {business.services}
                </span>
              </div>
            </div>
            <span className="text-gray-400 group-hover:text-red-600">
              View details →
            </span>
          </div>

          {business.businessDescription && (
            <p className="text-sm text-gray-600 mt-3 line-clamp-3 leading-relaxed">
              {business.businessDescription}
            </p>
          )}

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            {business.serviceHours && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 shrink-0">🕐</span>
                <span>{business.serviceHours}</span>
              </div>
            )}
            {business.serviceAreas && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 shrink-0">📍</span>
                <span>{business.serviceAreas}</span>
              </div>
            )}
          </div>

          {business.images && business.images.length > 1 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {business.images.slice(1, 4).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function BusinessList() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">
        Dummy list for now. Click a card to open the detailed page.
      </p>
      <div className="grid gap-6">
        {DUMMY_BUSINESSES.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
}
