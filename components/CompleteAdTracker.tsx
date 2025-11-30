"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function CompleteAdTracker() {
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

  return null;
}
