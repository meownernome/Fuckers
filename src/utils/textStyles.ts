export function formatTierRole(mode: string, tier: string): string {
  return `◆ ${mode} • ${tier}`;
}

export function formatStaffRoleName(emoji: string, name: string): string {
  return `${emoji} ${name}`;
}

export const BRAND = {
  SEPARATOR: '━━━━━━━━━━━━━━━━━━━━━━',
  TITLE_OPEN: '〔 ',
  TITLE_CLOSE: ' 〕',
  BULLET: '◆',
  SUB_BULLET: '▸',
  LINE_V: '│',
  LINE_H: '━',
  DARK: 0x0A0A0F,
  CYAN: 0x00BCD4,
  WHITE: 0xFFFFFF,
};

export function brandedBody(title: string, ...lines: string[]): string {
  const sep = BRAND.SEPARATOR;
  return [
    `\`\`\`md\n${sep}`,
    title ? `\n${BRAND.TITLE_OPEN}${title}${BRAND.TITLE_CLOSE}` : '',
    `\n${sep}\`\`\``,
    ...lines,
    `\`\`\`md\n${sep}\`\`\``,
  ].filter(Boolean).join('\n');
}
