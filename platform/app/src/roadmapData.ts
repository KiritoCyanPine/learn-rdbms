import { Roadmap, RoadmapSection } from './types';
import { marked } from 'marked';
import readmeContent from '../../../docs/README.md';

/**
 * Complete learning roadmap dynamically loaded from docs/README.md
 * Parses markdown structure and maps sections to modules
 */

// Section metadata: map section numbers to IDs, week ranges, and related modules
const sectionMetadata: Record<
  number,
  { id: string; weekRange: string; relatedModuleId?: string }
> = {
  1: { id: 'intro-rdbms', weekRange: '1-2', relatedModuleId: 'sql-basics' },
  2: { id: 'sql-basics', weekRange: '1-2', relatedModuleId: 'sql-basics' },
  3: {
    id: 'data-retrieval',
    weekRange: '1-2',
    relatedModuleId: 'data-retrieval',
  },
  4: { id: 'joins', weekRange: '3', relatedModuleId: 'joins' },
  5: { id: 'aggregation', weekRange: '4', relatedModuleId: 'aggregation' },
  6: { id: 'subqueries', weekRange: '4', relatedModuleId: 'subqueries' },
  7: { id: 'database-design', weekRange: '5' },
  8: { id: 'advanced-sql', weekRange: '6', relatedModuleId: 'advanced' },
  9: { id: 'practical-apps', weekRange: '7-8' },
  10: { id: 'postgres-migration', weekRange: '9' },
};

/**
 * Parse README.md markdown into structured roadmap sections
 */
function parseReadmeIntoRoadmap(markdown: string): Roadmap {
  const tokens = marked.lexer(markdown);

  let learningPathIntro = '';
  const sections: RoadmapSection[] = [];
  let currentSection: Partial<RoadmapSection> | null = null;
  let currentContent: string[] = [];
  let inIntro = true;

  for (const token of tokens) {
    // H2 headings mark section boundaries
    if (token.type === 'heading' && token.depth === 2) {
      // Save previous section if exists
      if (currentSection && currentSection.title) {
        currentSection.content = currentContent.join('\n\n');
        sections.push(currentSection as RoadmapSection);
        currentContent = [];
      }

      inIntro = false;

      // Extract section number from title (e.g., "1. Introduction..." -> 1)
      const match = token.text.match(/^(\d+)\.\s+(.+)/);
      const sectionNumber = match ? parseInt(match[1]) : sections.length + 1;
      const title = token.text;

      // Get metadata for this section
      const metadata = sectionMetadata[sectionNumber] || {
        id: `section-${sectionNumber}`,
        weekRange: '',
      };

      // Start new section
      currentSection = {
        id: metadata.id,
        title: title,
        weekRange: metadata.weekRange,
        relatedModuleId: metadata.relatedModuleId,
        content: '',
      };

      // Include the heading in the content
      currentContent.push(`## ${title}`);
    } else {
      // Collect content for current section or intro
      const tokenText = reconstructToken(token);

      if (inIntro) {
        learningPathIntro += tokenText + '\n\n';
      } else if (currentSection) {
        currentContent.push(tokenText);
      }
    }
  }

  // Save last section
  if (currentSection && currentSection.title) {
    currentSection.content = currentContent.join('\n\n');
    sections.push(currentSection as RoadmapSection);
  }

  return {
    learningPathIntro: learningPathIntro.trim(),
    sections,
  };
}

/**
 * Reconstruct markdown text from a marked token
 */
function reconstructToken(token: any): string {
  switch (token.type) {
    case 'heading':
      const hashes = '#'.repeat(token.depth);
      return `${hashes} ${token.text}`;

    case 'code':
      return `\`\`\`${token.lang || ''}\n${token.text}\n\`\`\``;

    case 'blockquote':
      return token.text
        .split('\n')
        .map((line: string) => `> ${line}`)
        .join('\n');

    case 'list':
      return reconstructList(token);

    case 'table':
      return reconstructTable(token);

    case 'paragraph':
      return token.text;

    case 'hr':
      return '---';

    case 'space':
      return '';

    default:
      // For other token types, try to extract text
      return (token as any).text || (token as any).raw || '';
  }
}

/**
 * Reconstruct markdown list from token
 */
function reconstructList(token: any): string {
  const items = token.items.map((item: any, index: number) => {
    const marker = token.ordered ? `${index + 1}.` : '-';
    const text = item.text;
    return `${marker} ${text}`;
  });
  return items.join('\n');
}

/**
 * Reconstruct markdown table from token
 */
function reconstructTable(token: any): string {
  const header = token.header.map((cell: any) => cell.text);
  const rows = token.rows.map((row: any) => row.map((cell: any) => cell.text));

  // Create table header
  const headerRow = '| ' + header.join(' | ') + ' |';
  const separator = '| ' + header.map(() => '---').join(' | ') + ' |';

  // Create table rows
  const bodyRows = rows.map((row: any) => '| ' + row.join(' | ') + ' |');

  return [headerRow, separator, ...bodyRows].join('\n');
}

// Parse README.md and export as roadmapData
export const roadmapData: Roadmap = parseReadmeIntoRoadmap(readmeContent);
