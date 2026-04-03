import posthog from "posthog-js";

declare global {
  interface Window {
    __WHIM_POSTHOG_INITIALIZED__?: boolean;
  }
}

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

try {
  performance.mark("whim-analytics-init");

  if (
    typeof window !== "undefined" &&
    posthogKey &&
    !window.__WHIM_POSTHOG_INITIALIZED__
  ) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_performance: false,
      disable_session_recording: true,
      persistence: "localStorage+cookie",
    });

    window.__WHIM_POSTHOG_INITIALIZED__ = true;
  }
} catch (error) {
  console.error("[Analytics] PostHog init failed", error);
}
