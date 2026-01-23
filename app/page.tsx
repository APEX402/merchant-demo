'use client'

import React, { Suspense, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { CompleteAdTracker } from "../components/CompleteAdTracker";
import { WalletButton } from "@/components/WalletButton";
import { PurchaseDialog } from "@/components/PurchaseDialog";

export default function Home() {
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-muted text-foreground flex flex-col">
      <Suspense fallback={null}>
        <CompleteAdTracker />
      </Suspense>
      {/* Header */}
      <header className="w-full apex-section-black shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="text-2xl font-bold tracking-tight text-primary">
            APEX AIRWAYS
          </div>
          <WalletButton />
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Search Summary (full-width bar) */}
        <section className="w-full bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-6 pt-6 pb-4">
            <div className="text-sm text-muted-foreground">
              London Heathrow (LHR) → Dubai (DXB)
            </div>
            <div className="text-sm text-foreground/70 mt-1">
              One way • 1 passenger{" "}
              <span className="underline cursor-pointer text-primary-dark font-medium">
                Change search
              </span>
            </div>
          </div>
        </section>

        {/* Price + Title Row (full-width bar) */}
        <section className="w-full bg-white shadow-sm border-t border-muted">
          <div className="max-w-5xl mx-auto px-6 pt-4 pb-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Choose your outbound flight
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  London Heathrow to Dubai
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs uppercase tracking-wide text-primary-dark font-medium">
                  Lowest total price for 1 passenger
                </div>
                <div className="text-2xl font-semibold text-primary-dark">
                  USDT <span className="font-bold">5.00</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Inclusive of airfare, taxes, fees and carrier imposed charges
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Pay with crypto on BNB Testnet
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto">
          {/* Date Navigation */}
          <section className="px-6 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-foreground font-medium">
              Saturday, 29 November 2025{" "}
              <span className="text-muted-foreground font-normal">(1 option)</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-foreground/70 hover:bg-white">
                <ChevronLeft size={18} />
                Previous day
              </button>
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-foreground/70 hover:bg-white">
                Next day
                <ChevronRight size={18} />
              </button>
            </div>
          </section>

          {/* Cabin Filters + Sort */}
          <section className="px-6 pt-4 pb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-foreground mr-1">Show prices for:</span>
              <button className="h-8 rounded-full bg-primary hover:bg-primary/90 text-black font-medium px-4 text-sm">
                Economy
              </button>
              <button className="h-8 rounded-full border border-foreground/20 px-4 text-sm text-foreground bg-white hover:bg-muted">
                Premium Economy
              </button>
              <button className="h-8 rounded-full border border-foreground/20 px-4 text-sm text-foreground bg-white hover:bg-muted">
                Business
              </button>
              <button className="h-8 rounded-full border border-foreground/20 px-4 text-sm text-foreground bg-white hover:bg-muted">
                First
              </button>
            </div>

            <button className="h-8 rounded-full border border-foreground/20 px-4 text-sm text-foreground flex items-center gap-2 self-start md:self-auto bg-white hover:bg-muted">
              <SlidersHorizontal size={14} />
              Sort: Lowest price
              <ChevronDown size={14} />
            </button>
          </section>

          {/* Flight Card */}
          <div className="px-6 pb-10 pt-4 bg-muted">
            <div className="shadow-md rounded-2xl overflow-hidden bg-white">
              <div className="p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left */}
                  <div className="min-w-[120px]">
                    <div className="text-xs text-muted-foreground">Sat 29 Nov</div>
                    <div className="text-3xl font-bold text-foreground leading-tight">
                      09:40
                    </div>
                    <div className="text-sm text-foreground font-medium mt-1">
                      LHR
                    </div>
                    <div className="text-xs text-muted-foreground">
                      London Heathrow
                    </div>
                  </div>

                  {/* Middle */}
                  <div className="flex-1 flex flex-col items-center justify-center text-foreground/70">
                    <div className="text-sm">6 hrs 30 mins</div>
                    <div className="w-28 border-t border-foreground/20 my-2" />
                    <button className="text-sm text-primary-dark font-medium underline-offset-2 hover:underline">
                      Non-stop
                    </button>
                  </div>

                  {/* Right */}
                  <div className="min-w-[120px] text-right">
                    <div className="text-xs text-muted-foreground">Sun 30 Nov</div>
                    <div className="text-3xl font-bold text-foreground leading-tight">
                      20:10
                    </div>
                    <div className="text-sm text-foreground font-medium mt-1">
                      DXB
                    </div>
                    <div className="text-xs text-muted-foreground">Dubai</div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 border-t border-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="apex-badge-yellow">APEX</span>
                    <span>A380 AX004</span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      Economy Class
                    </div>
                    <button
                      onClick={() => setIsPurchaseOpen(true)}
                      className="bg-primary hover:bg-primary/90 text-black font-medium rounded-full px-6 py-2 text-sm transition-colors"
                    >
                      from USDT 5.00
                    </button>
                    <div className="text-[11px] text-primary-dark font-medium">
                      Pay with crypto • BNB Testnet
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Purchase Dialog */}
      <PurchaseDialog
        isOpen={isPurchaseOpen}
        onClose={() => setIsPurchaseOpen(false)}
      />
    </div>
  );
}
