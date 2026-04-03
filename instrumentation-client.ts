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
      defaults: "2025-05-24",
      capture_pageview: "history_change",
      capture_pageleave: true,
      persistence: "localStorage+cookie",
    });

    window.__WHIM_POSTHOG_INITIALIZED__ = true;
  }
} catch (error) {
  console.error("[Analytics] PostHog init failed", error);
}

export function onRouterTransitionStart(
  url: string,
  navigationType: "push" | "replace" | "traverse",
) {
  if (!posthogKey) {
    return;
  }

  try {
    posthog.capture("app_navigation_started", {
      navigationType,
      url,
    });
  } catch (error) {
    console.error("[Analytics] Navigation tracking failed", error);
  }
}
