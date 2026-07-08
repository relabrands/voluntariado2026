type RelabrandsErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type RelabrandsEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: RelabrandsErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __relabrandsEvents?: RelabrandsEvents;
  }
}

export function reportRelabrandsError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__relabrandsEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
