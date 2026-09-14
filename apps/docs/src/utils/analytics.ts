declare global {
  interface Window {
    umami?: { track: (event: string) => void };
  }
}

export function trackEvent(name: string) {
  window.umami?.track(name);
}
