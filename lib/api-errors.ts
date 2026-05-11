export function getErrorMessage(error: unknown) {
  if (!error) {
    return "";
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return String(error);
}

export function fallbackHeaders(error: unknown) {
  const message = getErrorMessage(error);
  const headers = new Headers({
    "X-Portfolio-Data-Source": "fallback",
  });

  if (message) {
    headers.set("X-Portfolio-Setup-Error", message);
  }

  return headers;
}
