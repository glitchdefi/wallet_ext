export const getFaviconFromUrl = (_url: string): string => {
  let url = _url;
  if (url.includes('polkadot.js.org') || url.includes('13.212.197.46:3000')) {
    url = `polkadot.js.org/apps`;
  }
  return `https://s2.googleusercontent.com/s2/favicons?domain_url=https://${url}`;
};
