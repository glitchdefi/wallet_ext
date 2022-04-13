import secrets from 'secrets';

const ALLOWED_PATH = [
  '/',
  '/account/import-ledger',
  '/account/restore-json',
] as const;
const EXTENSION_PREFIX = secrets.extensionPrefix || '';
const PORT_EXTENSION = `${EXTENSION_PREFIX}-extension`;
const PORT_CONTENT = `${EXTENSION_PREFIX}-content`;
const MESSAGE_ORIGIN_CONTENT = `${EXTENSION_PREFIX}-content`;
const MESSAGE_ORIGIN_PAGE = `${EXTENSION_PREFIX}-page`;
const PHISHING_PAGE_REDIRECT = '/phishing-page-detected';

export {
  ALLOWED_PATH,
  EXTENSION_PREFIX,
  PORT_EXTENSION,
  PORT_CONTENT,
  PHISHING_PAGE_REDIRECT,
  MESSAGE_ORIGIN_CONTENT,
  MESSAGE_ORIGIN_PAGE,
};
