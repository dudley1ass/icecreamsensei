import { PUBLIC_SITE_ORIGIN } from './routing';

const DEFAULT_TITLE = 'Ice Cream Sensei — Mix calculator, POD/PAC & food science';
const DEFAULT_DESCRIPTION =
  'Free ice cream mix calculator: adjust ingredients, see fat, sugar, MSNF, total solids, POD and PAC, nutrition facts, churning tips, and taste notes — built for makers who care about the science.';

let canonicalLink: HTMLLinkElement | null = null;

function getCanonicalLink(): HTMLLinkElement {
  if (!canonicalLink) {
    const existing = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (existing) {
      canonicalLink = existing;
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
  }
  return canonicalLink;
}

/** Absolute URL for canonical (PUBLIC_SITE_ORIGIN has no trailing slash; path starts with `/`). */
export function absoluteUrl(pathFromRoot: string): string {
  const origin = PUBLIC_SITE_ORIGIN.replace(/\/$/, '');
  const p =
    !pathFromRoot || pathFromRoot === '/'
      ? '/'
      : pathFromRoot.startsWith('/')
        ? pathFromRoot
        : `/${pathFromRoot}`;
  return `${origin}${p}`;
}

export function setCanonicalTo(absoluteHref: string): void {
  getCanonicalLink().href = absoluteHref;
}

export function setDocumentTitle(title: string): void {
  document.title = title;
}

export function applyHomeSeo(pathForCanonical: string): void {
  setDocumentTitle(DEFAULT_TITLE);
  setCanonicalTo(absoluteUrl(pathForCanonical));
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', DEFAULT_DESCRIPTION);
}

export function applyCalculatorSeo(opts: {
  categoryName: string;
  recipeEmoji: string;
  recipeName: string;
  canonicalPathFromRoot: string;
}): void {
  const { categoryName, recipeEmoji, recipeName, canonicalPathFromRoot } = opts;
  setDocumentTitle(`${recipeEmoji} ${recipeName} · ${categoryName} · Ice Cream Sensei`);
  setCanonicalTo(absoluteUrl(canonicalPathFromRoot));
  const d = `${recipeName} (${categoryName}) — ice cream mix calculator with science scores, POD/PAC, nutrition, and churning guidance on Ice Cream Sensei.`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', d.slice(0, 165));
}

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION };
