import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';

/**
 * Parse markdown content to HTML with syntax highlighting
 * @param markdown Raw markdown string
 * @returns Sanitized HTML string with syntax-highlighted code blocks
 */
export function parseMarkdown(markdown: string): string {
  // Configure marked options
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: false,
  });

  // Custom renderer for code blocks to apply Prism.js syntax highlighting
  const renderer = new marked.Renderer();

  renderer.code = (code, language) => {
    // Default to sql if no language specified
    const lang = language || 'sql';

    // Check if Prism supports this language
    if (Prism.languages[lang]) {
      const highlightedCode = Prism.highlight(
        code,
        Prism.languages[lang],
        lang,
      );
      return `<pre><code class="language-${lang}">${highlightedCode}</code></pre>`;
    }

    // Fallback for unsupported languages
    return `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
  };

  marked.use({ renderer });

  // Parse markdown to HTML
  return marked.parse(markdown) as string;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

/**
 * Extract sections from markdown content based on heading levels
 * Useful for parsing README.md into structured sections
 */
export function extractSections(
  markdown: string,
): Array<{ title: string; content: string; level: number }> {
  const sections: Array<{ title: string; content: string; level: number }> = [];
  const lines = markdown.split('\n');

  let currentSection: { title: string; content: string; level: number } | null =
    null;

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      // Save previous section if exists
      if (currentSection) {
        sections.push(currentSection);
      }

      // Start new section
      const level = headingMatch[1].length;
      const title = headingMatch[2];
      currentSection = { title, content: '', level };
    } else if (currentSection) {
      // Add line to current section content
      currentSection.content += line + '\n';
    }
  }

  // Don't forget the last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}
