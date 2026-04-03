"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function HomepageAnalytics() {
  useEffect(() => {
    posthog.capture("homepage_viewed", {
      route: "/",
    });
  }, []);

  return null;
}
