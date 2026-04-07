/** Live production origin for absolute canonical URLs (no trailing slash). */
export const PUBLIC_SITE_ORIGIN = 'https://icecreamsensei.senseifood.com';

const ICE_ROUTE = /^\/ice-cream\/([^/]+)(?:\/([^/]+))?$/;

/**
 * Join a path with Vite `base` (e.g. deploy under `/tools/`).
 * @param path Must start with `/` or be empty.
 */
export function joinBase(path: string): string {
  const baseRaw = import.meta.env.BASE_URL ?? '/';
  const base = baseRaw.endsWith('/') ? baseRaw.slice(0, -1) : baseRaw;
  const p = path === '' || path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  if (!base || base === '') return p;
  if (p === '/') return `${base}/`;
  return `${base}${p}`;
}

/** Strip Vite base from pathname → app-relative path starting with `/`. */
export function stripAppPath(pathname: string): string {
  const baseRaw = import.meta.env.BASE_URL ?? '/';
  const base = baseRaw.endsWith('/') ? baseRaw.slice(0, -1) : baseRaw;
  if (!base || base === '') return pathname || '/';
  if (pathname === base || pathname === `${base}/`) return '/';
  if (pathname.startsWith(base + '/')) return pathname.slice(base.length) || '/';
  return pathname || '/';
}

export interface IceCreamRouteMatch {
  categoryId: string;
  recipeId?: string;
}

export function parseIceCreamRoute(appPath: string): IceCreamRouteMatch | null {
  const p = appPath === '' ? '/' : appPath.startsWith('/') ? appPath : `/${appPath}`;
  const m = p.match(ICE_ROUTE);
  if (!m) return null;
  return { categoryId: decodeURIComponent(m[1]), recipeId: m[2] ? decodeURIComponent(m[2]) : undefined };
}

/**
 * One-time upgrade from hash URLs (e.g. `#/ice-cream/classic/vanilla-classic` or `#/classic/vanilla`) to path URLs.
 * Returns true if a replacement was applied.
 */
export function migrateLegacyHashToPath(): boolean {
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  if (!raw) return false;

  const segments = raw.split('/').filter(Boolean);
  const path =
    segments.length === 0
      ? '/'
      : segments[0] === 'ice-cream'
        ? `/${segments.join('/')}`
        : `/ice-cream/${segments.join('/')}`;

  const url = new URL(window.location.href);
  url.hash = '';
  url.pathname = joinBase(path === '/' ? '/' : path);
  window.history.replaceState(window.history.state, '', url.toString());
  return true;
}

export function iceCreamCalculatorPath(categoryId: string, recipeId: string): string {
  return joinBase(`/ice-cream/${encodeURIComponent(categoryId)}/${encodeURIComponent(recipeId)}`);
}

export function iceCreamHomePath(): string {
  return joinBase('/');
}
