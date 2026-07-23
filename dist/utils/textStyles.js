"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRAND = void 0;
exports.formatTierRole = formatTierRole;
exports.formatStaffRoleName = formatStaffRoleName;
exports.brandedBody = brandedBody;
function formatTierRole(mode, tier) {
    return `◆ ${mode} • ${tier}`;
}
function formatStaffRoleName(emoji, name) {
    return `${emoji} ${name}`;
}
exports.BRAND = {
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
function brandedBody(title, ...lines) {
    const sep = exports.BRAND.SEPARATOR;
    return [
        `\`\`\`md\n${sep}`,
        title ? `\n${exports.BRAND.TITLE_OPEN}${title}${exports.BRAND.TITLE_CLOSE}` : '',
        `\n${sep}\`\`\``,
        ...lines,
        `\`\`\`md\n${sep}\`\`\``,
    ].filter(Boolean).join('\n');
}
