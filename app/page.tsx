"use client";

import React, { useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { Caveat } from "next/font/google";
import { useSearchParams } from "next/navigation";

const brandFont = Caveat({
  subsets: ["cyrillic"],
  weight: ["700"],
});

export default function Home() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = searchParams.get("hash");
    const facilitatorSignature = searchParams.get("facilitatorSignature");

    if (!hash || !facilitatorSignature) {
      return;
    }

    const sendCompleteAd = async () => {
      try {
        const res = await fetch("/api/complete-ad", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hash, facilitatorSignature }),
        });

        const data = await res.json().catch(() => null);
        console.log("/api/complete-ad response", {
          ok: res.ok,
          status: res.status,
          data,
        });
      } catch (error) {
        console.error("/api/complete-ad error", error);
      }
    };

    void sendCompleteAd();
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#d71921] text-white shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
          <div
            className={`${brandFont.className} text-2xl font-bold tracking-tight`}
          >
            APEX AIRWAYS
          </div>
          <button className="flex items-center gap-1 rounded-md border border-white/40 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
            View summary <ChevronDown size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Search Summary (full-width bar) */}
        <section className="w-full bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-6 pt-6 pb-4">
            <div className="text-sm text-gray-600">
              London Heathrow (LHR) → Dubai (DXB)
            </div>
            <div className="text-sm text-gray-700 mt-1">
              One way • 1 passenger{" "}
              <span className="underline cursor-pointer text-emerald-700">
                Change search
              </span>
            </div>
          </div>
        </section>

        {/* Price + Title Row (full-width bar) */}
        <section className="w-full bg-white shadow-sm border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 pt-4 pb-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  Choose your outbound flight
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  London Heathrow to Dubai
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs uppercase tracking-wide text-emerald-700">
                  Lowest total price for 1 passenger
                </div>
                <div className="text-2xl font-semibold text-emerald-700">
                  GBP <span className="font-bold">579.00</span>
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Inclusive of airfare, taxes, fees and carrier imposed charges
                </div>
                <button className="mt-1 inline-flex items-center text-xs text-gray-600 hover:text-gray-800">
                  Change currency
                  <ChevronDown size={12} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto">
          {/* Date Navigation */}
          <section className="px-6 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-700 font-medium">
              Saturday, 29 November 2025{" "}
              <span className="text-gray-500 font-normal">(1 option)</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">
                <ChevronLeft size={18} />
                Previous day
              </button>
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">
                Next day
                <ChevronRight size={18} />
              </button>
            </div>
          </section>

          {/* Cabin Filters + Sort */}
          <section className="px-6 pt-4 pb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-700 mr-1">Show prices for:</span>
              <button className="h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-4 text-sm">
                Economy
              </button>
              <button className="h-8 rounded-full border border-gray-300 px-4 text-sm text-gray-700 bg-white hover:bg-gray-50">
                Premium Economy
              </button>
              <button className="h-8 rounded-full border border-gray-300 px-4 text-sm text-gray-700 bg-white hover:bg-gray-50">
                Business
              </button>
              <button className="h-8 rounded-full border border-gray-300 px-4 text-sm text-gray-700 bg-white hover:bg-gray-50">
                First
              </button>
            </div>

            <button className="h-8 rounded-full border border-gray-300 px-4 text-sm text-gray-700 flex items-center gap-2 self-start md:self-auto bg-white hover:bg-gray-50">
              <SlidersHorizontal size={14} />
              Sort: Lowest price
              <ChevronDown size={14} />
            </button>
          </section>

          {/* Flight Card */}
          <div className="px-6 pb-10 pt-4 bg-gray-100">
            <div className="shadow-md rounded-2xl overflow-hidden bg-white">
              <div className="p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left */}
                  <div className="min-w-[120px]">
                    <div className="text-xs text-gray-500">Sat 29 Nov</div>
                    <div className="text-3xl font-bold text-gray-900 leading-tight">
                      09:40
                    </div>
                    <div className="text-sm text-gray-700 font-medium mt-1">
                      LHR
                    </div>
                    <div className="text-xs text-gray-500">
                      London Heathrow
                    </div>
                  </div>

                  {/* Middle */}
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-700">
                    <div className="text-sm">6 hrs 30 mins</div>
                    <div className="w-28 border-t border-gray-300 my-2" />
                    <button className="text-sm text-emerald-700 font-medium underline-offset-2 hover:underline">
                      Non-stop
                    </button>
                  </div>

                  {/* Right */}
                  <div className="min-w-[120px] text-right">
                    <div className="text-xs text-gray-500">Sun 30 Nov</div>
                    <div className="text-3xl font-bold text-gray-900 leading-tight">
                      20:10
                    </div>
                    <div className="text-sm text-gray-700 font-medium mt-1">
                      DXB
                    </div>
                    <div className="text-xs text-gray-500">Dubai</div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="inline-block h-4 w-4 rounded-full bg-red-600" />
                    <span>A380 AX004</span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Economy Class
                    </div>
                    <button className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl px-6 py-2 text-sm">
                      from GBP 579.00
                    </button>
                    <div className="text-[11px] text-emerald-700">
                      Lowest price with Promotional Offer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}