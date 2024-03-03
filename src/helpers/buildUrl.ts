export const buildUrl = (
  url?: string,
  baseUrl?: string
): string | undefined => {
  if (!url || !baseUrl) {
    return undefined;
  }

  return new URL(url, (baseUrl + '/').replace(/\/+$/, '/')).href;
};
