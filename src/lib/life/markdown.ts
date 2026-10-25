import { Marked, type Tokens } from "marked";

// Item bodies come from generated content, but the renderer is still strict:
// raw HTML is shown as text, images must be local life-media files, and links
// must be http(s)/mailto.
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const marked = new Marked({
  renderer: {
    html: ({ text }: Tokens.HTML | Tokens.Tag) => escape(text),
    image: ({ href, text }: Tokens.Image) => (href.startsWith("/life-media/") ? `<img src="${escape(href)}" alt="${escape(text)}" loading="lazy">` : escape(text)),
    link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
      const inner = this.parser.parseInline(tokens);
      if (!/^(https?:|mailto:)/i.test(href)) return inner;
      return `<a href="${escape(href)}"${title ? ` title="${escape(title)}"` : ""} rel="noopener noreferrer">${inner}</a>`;
    },
  },
});

export function renderMarkdown(src: string): string {
  return marked.parse(src, { async: false }) as string;
}
