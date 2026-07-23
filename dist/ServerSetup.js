"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSetup = exports.HARVAL_CHANNEL_NAMES = exports.HARVAL_CATEGORY_NAMES = exports.CHANNEL_KEYS = exports.CATEGORIES = void 0;
const discord_js_1 = require("discord.js");
const Logger_1 = require("./utils/Logger");
const roles_1 = require("./roles");
const roleCreator_1 = require("./utils/roleCreator");
const textStyles_1 = require("./utils/textStyles");
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  HARVAL MC — CATEGORY & CHANNEL DEFINITIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SEP = textStyles_1.BRAND.SEPARATOR;
const B1 = textStyles_1.BRAND.TITLE_OPEN; // 「
const B2 = textStyles_1.BRAND.TITLE_CLOSE; // 」
const CYAN = textStyles_1.BRAND.CYAN;
const DARK = textStyles_1.BRAND.DARK;
const READONLY_KEYS = new Set([
    'welcome', 'rules', 'faq', 'announcements', 'server-ip', 'updates',
    'verify',
    'roles', 'tier-guide',
    'request-test', 'queue', 'tier-results', 'leaderboards', 'tier-info', 'retest',
    'create-ticket', 'bug-report', 'report-player', 'appeal', 'questions',
]);
// ── Categories ──
exports.CATEGORIES = [
    { key: 'information', name: `━ ${B1}ＩＮＦＯＲＭＡＴＩＯＮ${B2} ━`, position: 0 },
    { key: 'verification', name: `━ ${B1}ＶＥＲＩＦＩＣＡＴＩＯＮ${B2} ━`, position: 1 },
    { key: 'community', name: `━ ${B1}ＣＯＭＭＵＮＩＴＹ${B2} ━`, position: 2 },
    { key: 'roles', name: `━ ${B1}ＲＯＬＥＳ${B2} ━`, position: 3 },
    { key: 'tier-testing', name: `━ ${B1}ＴＩＥＲ ＴＥＳＴＩＮＧ${B2} ━`, position: 4 },
    { key: 'tickets', name: `━ ${B1}ＴＩＣＫＥＴＳ${B2} ━`, position: 5 },
    { key: 'support', name: `━ ${B1}ＳＵＰＰＯＲＴ${B2} ━`, position: 6 },
    { key: 'staff', name: `━ ${B1}ＳＴＡＦＦ${B2} ━`, position: 7 },
    { key: 'logs', name: `━ ${B1}ＬＯＧＳ${B2} ━`, position: 8 },
    { key: 'voice', name: `━ ${B1}ＶＯＩＣＥ${B2} ━`, position: 9 },
];
// ── Channels ──
exports.CHANNEL_KEYS = {
    welcome: '◆・welcome',
    rules: '◆・rules',
    faq: '◆・faq',
    announcements: '◆・announcements',
    'server-ip': '◆・server-ip',
    updates: '◆・updates',
    verify: '◆・verify',
    general: '◆・general',
    minecraft: '◆・minecraft',
    clips: '◆・clips',
    screenshots: '◆・screenshots',
    media: '◆・media',
    polls: '◆・polls',
    suggestions: '◆・suggestions',
    'off-topic': '◆・off-topic',
    roles: '◆・roles',
    'tier-guide': '◆・tier-guide',
    'request-test': '◆・request-test',
    queue: '◆・queue',
    'tier-results': '◆・tier-results',
    leaderboards: '◆・leaderboards',
    'tier-info': '◆・tier-info',
    retest: '◆・retest',
    'create-ticket': '◆・create-ticket',
    'bug-report': '◆・bug-report',
    'report-player': '◆・report-player',
    appeal: '◆・appeal',
    questions: '◆・questions',
    'staff-chat': '◆・staff-chat',
    commands: '◆・commands',
    claims: '◆・claims',
    applications: '◆・applications',
    reports: '◆・reports',
    moderation: '◆・moderation',
    'ticket-logs': '◆・ticket-logs',
    'tier-logs': '◆・tier-logs',
    'bot-logs': '◆・bot-logs',
    'error-logs': '◆・error-logs',
    'join-leave': '◆・join-leave',
    'role-logs': '◆・role-logs',
    'verification-logs': '◆・verification-logs',
    'command-logs': '◆・command-logs',
    'general-1': '◆・general-1',
    'general-2': '◆・general-2',
    afk: '◆・afk',
    'staff-vc': '◆・staff-vc',
    meeting: '◆・meeting',
};
const CHANNELS = [
    { cat: 'information', key: 'welcome', topic: '━━━ Welcome to HARVAL MC ━━━' },
    { cat: 'information', key: 'rules', topic: '━━━ Server Rules ━━━' },
    { cat: 'information', key: 'faq', topic: '━━━ Frequently Asked Questions ━━━' },
    { cat: 'information', key: 'announcements', topic: '━━━ Network Announcements ━━━' },
    { cat: 'information', key: 'server-ip', topic: '━━━ play.harvalmc.fun ━━━' },
    { cat: 'information', key: 'updates', topic: '━━━ Patch Notes & Updates ━━━' },
    { cat: 'verification', key: 'verify', topic: '━━━ Verify your account ━━━' },
    { cat: 'community', key: 'general', topic: '━━━ General chat ━━━' },
    { cat: 'community', key: 'minecraft', topic: '━━━ Minecraft discussion ━━━' },
    { cat: 'community', key: 'clips', topic: '━━━ Share your clips ━━━' },
    { cat: 'community', key: 'screenshots', topic: '━━━ Screenshots & builds ━━━' },
    { cat: 'community', key: 'media', topic: '━━━ Videos & streams ━━━' },
    { cat: 'community', key: 'polls', topic: '━━━ Community polls ━━━' },
    { cat: 'community', key: 'suggestions', topic: '━━━ Feature suggestions ━━━' },
    { cat: 'community', key: 'off-topic', topic: '━━━ Off-topic discussion ━━━' },
    { cat: 'roles', key: 'roles', topic: '━━━ Available roles ━━━' },
    { cat: 'roles', key: 'tier-guide', topic: '━━━ Tier system guide ━━━' },
    { cat: 'tier-testing', key: 'request-test', topic: '━━━ Request a tier test ━━━' },
    { cat: 'tier-testing', key: 'queue', topic: '━━━ Active tier test queue ━━━' },
    { cat: 'tier-testing', key: 'tier-results', topic: '━━━ Tier test results ━━━' },
    { cat: 'tier-testing', key: 'leaderboards', topic: '━━━ Points leaderboard ━━━' },
    { cat: 'tier-testing', key: 'tier-info', topic: '━━━ Tier explanations ━━━' },
    { cat: 'tier-testing', key: 'retest', topic: '━━━ Retest requests ━━━' },
    { cat: 'support', key: 'create-ticket', topic: '━━━ Open a support ticket ━━━' },
    { cat: 'support', key: 'bug-report', topic: '━━━ Report a bug ━━━' },
    { cat: 'support', key: 'report-player', topic: '━━━ Report a player ━━━' },
    { cat: 'support', key: 'appeal', topic: '━━━ Appeal a punishment ━━━' },
    { cat: 'support', key: 'questions', topic: '━━━ General questions ━━━' },
    { cat: 'staff', key: 'staff-chat', topic: '━━━ Staff discussion ━━━' },
    { cat: 'staff', key: 'commands', topic: '━━━ Bot commands ━━━' },
    { cat: 'staff', key: 'claims', topic: '━━━ Tier test claims ━━━' },
    { cat: 'staff', key: 'applications', topic: '━━━ Staff applications ━━━' },
    { cat: 'staff', key: 'reports', topic: '━━━ Player reports ━━━' },
    { cat: 'staff', key: 'moderation', topic: '━━━ Moderation actions ━━━' },
    { cat: 'logs', key: 'ticket-logs', topic: '━━━ Ticket logs ━━━' },
    { cat: 'logs', key: 'tier-logs', topic: '━━━ Tier test logs ━━━' },
    { cat: 'logs', key: 'bot-logs', topic: '━━━ Bot activity logs ━━━' },
    { cat: 'logs', key: 'error-logs', topic: '━━━ Error logs ━━━' },
    { cat: 'logs', key: 'join-leave', topic: '━━━ Member join/leave logs ━━━' },
    { cat: 'logs', key: 'role-logs', topic: '━━━ Role assignment logs ━━━' },
    { cat: 'logs', key: 'verification-logs', topic: '━━━ Verification logs ━━━' },
    { cat: 'logs', key: 'command-logs', topic: '━━━ Command usage logs ━━━' },
    { cat: 'voice', key: 'general-1', topic: 'Voice chat' },
    { cat: 'voice', key: 'general-2', topic: 'Voice chat' },
    { cat: 'voice', key: 'afk', topic: 'AFK' },
    { cat: 'voice', key: 'staff-vc', topic: 'Staff voice' },
    { cat: 'voice', key: 'meeting', topic: 'Meeting room' },
];
// ── HARVAL tracking (for cleanup) ──
exports.HARVAL_CATEGORY_NAMES = new Set(exports.CATEGORIES.map(c => c.name));
exports.HARVAL_CHANNEL_NAMES = new Set(Object.values(exports.CHANNEL_KEYS));
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  HELPER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function embed(title, desc, color) {
    return new discord_js_1.EmbedBuilder()
        .setColor(color)
        .setDescription(`${SEP}\n\n${desc}`)
        .setTimestamp();
}
function msg(text) {
    return `${SEP}\n\n${text}\n\n${SEP}`;
}
function actionRow(...btns) {
    return new discord_js_1.ActionRowBuilder().addComponents(...btns);
}
function btn(id, label, style) {
    return new discord_js_1.ButtonBuilder().setCustomId(id).setLabel(label).setStyle(style);
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  CLASS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class ServerSetup {
    guild;
    constructor(client, guild) { this.guild = guild; }
    sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
    tc(key) {
        const displayName = exports.CHANNEL_KEYS[key];
        if (!displayName)
            return undefined;
        return this.guild.channels.cache.find(c => c.name === displayName && c.type === discord_js_1.ChannelType.GuildText);
    }
    findCat(key) {
        const cat = exports.CATEGORIES.find(c => c.key === key);
        if (!cat)
            return undefined;
        return this.guild.channels.cache.find(c => c.type === discord_js_1.ChannelType.GuildCategory && c.name === cat.name);
    }
    // ─────────────────────────────────────────────────
    //  /all — categories + channels + roles + panels
    // ─────────────────────────────────────────────────
    async setupCategories() {
        let count = 0;
        for (const c of exports.CATEGORIES) {
            try {
                if (!this.guild.channels.cache.some(ch => ch.type === discord_js_1.ChannelType.GuildCategory && ch.name === c.name)) {
                    const cat = await this.guild.channels.create({ name: c.name, type: discord_js_1.ChannelType.GuildCategory });
                    await cat.setPosition(c.position);
                    Logger_1.logger.info(`  📁 ${c.key}`);
                    count++;
                }
            }
            catch (e) {
                Logger_1.logger.error(`  📁 FAIL ${c.key}: ${e.message}`);
            }
        }
        return count;
    }
    async setupChannels() {
        let count = 0;
        const everyone = this.guild.roles.everyone;
        for (const ch of CHANNELS) {
            try {
                const cat = this.findCat(ch.key);
                const displayName = exports.CHANNEL_KEYS[ch.key];
                if (!cat || !displayName || cat.children.cache.some(c => c.name === displayName))
                    continue;
                const vc = ch.key.startsWith('general-') || ch.key === 'afk' || ch.key === 'staff-vc' || ch.key === 'meeting';
                const overwrites = [];
                if (!vc && READONLY_KEYS.has(ch.key)) {
                    overwrites.push({ id: everyone.id, deny: [discord_js_1.PermissionFlagsBits.SendMessages] });
                }
                await cat.children.create({
                    name: displayName,
                    type: vc ? discord_js_1.ChannelType.GuildVoice : discord_js_1.ChannelType.GuildText,
                    topic: ch.topic || undefined,
                    permissionOverwrites: overwrites.length > 0 ? overwrites : undefined,
                });
                Logger_1.logger.info(`  #${displayName}`);
                count++;
                await this.sleep(500);
            }
            catch (e) {
                Logger_1.logger.error(`  #${ch.key} FAIL: ${e.message}`);
            }
        }
        return count;
    }
    async setupRoles() {
        let done = 0;
        let skipped = 0;
        let fails = 0;
        try {
            await this.guild.roles.fetch();
        }
        catch { }
        const existingNames = new Set(this.guild.roles.cache.map(r => r.name));
        for (let i = 0; i < roles_1.ALL_ROLES.length; i++) {
            const r = roles_1.ALL_ROLES[i];
            if (existingNames.has(r.name)) {
                done++;
                skipped++;
                continue;
            }
            try {
                await (0, roleCreator_1.createRole)(this.guild, r.name, r.color);
                done++;
                if (done % 25 === 0 || done === roles_1.ALL_ROLES.length) {
                    Logger_1.logger.info(`  [${done}/${roles_1.ALL_ROLES.length}] roles done (${fails} failed)`);
                }
                await this.sleep(1100);
            }
            catch (e) {
                fails++;
                Logger_1.logger.error(`  FAIL ${r.name}: ${e?.message || '?'}`);
                await this.sleep(1100);
            }
        }
        Logger_1.logger.info(`━━━ Roles: ${done - skipped} created, ${skipped} existed, ${fails} failed ━━━`);
        return done;
    }
    async setupAll() {
        Logger_1.logger.info(`━━━━━━━━━━ /all START ━━━━━━━━━━`);
        const cats = await this.setupCategories();
        const chans = await this.setupChannels();
        const roles = await this.setupRoles();
        await this.setupContent();
        Logger_1.logger.info(`━━━━━━━━━━ /all DONE (${cats} categories, ${chans} channels, ${roles} roles) ━━━━━━━━━━`);
    }
    // ─────────────────────────────────────────────────
    //  PANELS — full professional content
    // ─────────────────────────────────────────────────
    async setupContent() {
        const panels = [
            { key: 'welcome', build: (ch) => this.panelWelcome(ch) },
            { key: 'rules', build: (ch) => this.panelRules(ch) },
            { key: 'faq', build: (ch) => this.panelFaq(ch) },
            { key: 'verify', build: (ch) => this.panelVerify(ch) },
            { key: 'request-test', build: (ch) => this.panelTierTest(ch) },
            { key: 'queue', build: (ch) => this.panelQueue(ch) },
            { key: 'roles', build: (ch) => this.panelApplications(ch) },
            { key: 'create-ticket', build: (ch) => this.panelSupport(ch) },
            { key: 'tier-guide', build: (ch) => this.panelTierGuide(ch) },
            { key: 'leaderboards', build: (ch) => this.panelLeaderboards(ch) },
        ];
        for (const p of panels) {
            const ch = this.tc(p.key);
            if (ch) {
                try {
                    await p.build(ch);
                }
                catch (e) {
                    Logger_1.logger.error(`Panel ${p.key}: ${e.message}`);
                }
            }
            await this.sleep(300);
        }
    }
    // ── WELCOME PANEL ────────────────────────────────
    async panelWelcome(ch) {
        const body = [
            `${SEP}`,
            ``,
            `         ${B1}ＷＥＬＣＯＭＥ ＴＯ ＨＡＲＶＡＬ ＭＣ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ **Server IP** ── \`play.harvalmc.fun\``,
            `▸ **Version**   ── \`1.8.x — 1.21.x\``,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `│  **Step 1**  ◆  Read the rules below`,
            `│  **Step 2**  ◆  Verify in <#${this.tc('verify')?.id || 'verification'}>`,
            `│  **Step 3**  ◆  Check your roles in <#${this.tc('roles')?.id || 'roles'}>`,
            `│  **Step 4**  ◆  Request a tier test`,
            `│  **Step 5**  ◆  Join the community`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**What is HARVAL MC?**`,
            ``,
            `HARVAL MC is the premier Minecraft PvP Tier Testing network.`,
            `We provide competitive, fair, and professional tier testing`,
            `across 20+ PvP modes with a dedicated staff team.`,
            ``,
            `Whether you are a cracked Crystal sweat, a Sword lord,`,
            `or an SMP warrior — we have a tier for you.`,
            ``,
            `${'━'.repeat(16)} ◆ ${'━'.repeat(16)}`,
            ``,
            `*Compete. Climb. Conquer.*`,
            ``,
            `${SEP}`,
        ].join('\n');
        await ch.send({ embeds: [embed('', body, CYAN)] });
    }
    // ── RULES PANEL ──────────────────────────────────
    async panelRules(ch) {
        const header = [
            `${SEP}`,
            ``,
            `         ${B1}ＳＥＲＶＥＲ ＲＵＬＥＳ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ *Violating any rule may result in a mute, ban, or blacklist.*`,
            `▸ *Staff decisions are final.*`,
            ``,
        ].join('\n');
        const rules = [
            ['01', 'Respect All Players', 'Harassment, toxicity, discrimination, and hate speech are strictly prohibited. Treat others how you want to be treated.'],
            ['02', 'No Cheating', 'Hacked clients, macros, auto-clickers, reach, aim-assist, or any unfair advantage is banned.'],
            ['03', 'Follow Staff Instructions', 'Staff have the final say. Do not argue with staff in public. If you disagree, open an appeal ticket.'],
            ['04', 'No Spam', 'Do not spam messages, emojis, reactions, or mass-ping members/staff.'],
            ['05', 'English Only', 'Keep public channels in English so staff can moderate effectively.'],
            ['06', 'No Advertising', 'No advertising other Discord servers, Minecraft servers, or services.'],
            ['07', 'No Bug Abuse', 'Exploiting bugs glitches or unintended mechanics is bannable. Report bugs immediately.'],
            ['08', 'Keep It Clean', 'No NSFW, gore, slurs, or offensive content. No inappropriate usernames or avatars.'],
            ['09', 'No Doxxing', 'Sharing personal information of any player or staff is strictly forbidden.'],
            ['10', 'No Ban Evasion', 'Evading a punishment by using alternate accounts will result in an extended ban.'],
            ['11', 'No Cross-Trading', 'Selling or trading Discord roles in-game items or real money is not allowed.'],
            ['12', 'No False Reports', 'Submitting false reports or abusing the reporting system will result in punishment.'],
            ['13', 'No Staff Impersonation', 'Pretending to be a staff member or misusing staff tags is bannable.'],
            ['14', 'Tier Testing Integrity', 'Falsifying test results, bribing testers, or manipulating tier assignments is forbidden.'],
            ['15', 'Voice Chat Rules', 'No ear-rape, screaming, music bots, or disruptive behavior in voice channels.'],
            ['16', 'No Alt Accounts', 'Using alternate accounts to bypass tier locks or testing cooldowns is not allowed.'],
            ['17', 'Respect Privacy', 'Do not record or stream staff channels without explicit permission.'],
            ['18', 'Tier Tester Conduct', 'Testers must remain unbiased, professional, and fair at all times.'],
            ['19', 'Appeal Process', 'Punishments can be appealed in <#appeal>. False appeals may result in extended bans.'],
            ['20', 'Common Sense', 'Use common sense. If you think something might be against the rules it probably is.'],
        ];
        const msgs = [embed('', header, 0xE74C3C)];
        for (let i = 0; i < rules.length; i += 5) {
            const chunk = rules.slice(i, i + 5);
            const desc = chunk.map(([num, title, desc]) => {
                return `**\` ${num} \`** ── **${title}**\n│ ${desc}\n`;
            }).join('\n');
            msgs.push(embed('', desc, 0xE74C3C));
        }
        const footer = [
            `${SEP}`,
            `**Last updated:** ${new Date().toISOString().split('T')[0]}`,
            `**Violations:** Mute → Kick → Ban → Blacklist`,
            `**Appeals:** <#${this.tc('appeal')?.id || 'appeal'}>`,
            `${SEP}`,
        ].join('\n');
        msgs.push(embed('', footer, 0xE74C3C));
        for (const m of msgs)
            await ch.send({ embeds: [m] }).catch(() => { });
    }
    // ── FAQ PANEL ────────────────────────────────────
    async panelFaq(ch) {
        const header = [
            `${SEP}`,
            ``,
            `         ${B1}ＦＲＥＱＵＥＮＴＬＹ ＡＳＫＥＤ ＱＵＥＳＴＩＯＮＳ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ *Click the buttons below to navigate sections*`,
            ``,
        ].join('\n');
        const faqs = [
            { q: 'What is HARVAL MC?', a: 'HARVAL MC is a competitive Minecraft PvP Tier Testing network. We assess player skill across multiple PvP modes and assign tiers (LT1–HT5) to track progression.' },
            { q: 'How do I join the server?', a: 'Server IP: `play.harvalmc.fun`. Versions 1.8.x through 1.21.x are supported. No mods or hacked clients allowed.' },
            { q: 'How does tier testing work?', a: 'You request a test in <#request-test>. A tier tester claims your ticket, you fight in your chosen mode, and the tester assigns a tier based on your performance.' },
            { q: 'What tiers are there?', a: '10 tiers per mode: **LT1 → HT1 → LT2 → HT2 → LT3 → HT3 → LT4 → HT4 → LT5 → HT5** (Low Tier 1 → High Tier 5).' },
            { q: 'How long does a tier test take?', a: 'Most tests take 5–15 minutes depending on mode and queue length.' },
            { q: 'Can I retest?', a: 'You can request a retest after **7 days** from your last test in the same mode.' },
            { q: 'How do I become a Tier Tester?', a: 'Apply using the Tier Tester application in <#roles>. Requirements: HT3+ in the mode you wish to test, mature attitude, good knowledge of the mode.' },
            { q: 'What PvP modes are supported?', a: 'Sword, Crystal, SMP, Netherite Pot, Diamond Pot, BuildUHC, UHC, NoDebuff, Gapple, Combo, Boxing, Bridge, Anchor, Mace, Axe, Cart PvP, Vanilla, Bedwars, Skywars, Custom — 20 modes total.' },
            { q: 'What is the point system?', a: 'Each tier awards points: HT1=100, HT2=85, LT1=85, HT3=70, LT2=70, HT4=55, LT3=55, HT5=40, LT4=40, LT5=25. Points accumulate across all modes for the global leaderboard.' },
            { q: 'How do I verify?', a: 'Click the Verify button in <#verify>. You will be asked for your Minecraft IGN to link your Discord and MC accounts.' },
            { q: 'I got banned. How do I appeal?', a: 'Open an appeal ticket in <#appeal>. Include your IGN, the reason you were banned, and why you should be unbanned.' },
            { q: 'How do I report a player?', a: 'Use <#report-player> with evidence (screenshots, video, replay). Staff will review and take action.' },
            { q: 'Can I suggest features?', a: 'Yes! Use <#suggestions>. Upvoted suggestions are reviewed by the development team.' },
            { q: 'What happens if I cheat on a test?', a: 'Cheating on a tier test results in an immediate permanent blacklist from HARVAL MC.' },
            { q: 'How do I contact staff?', a: 'Join a support ticket through <#create-ticket>, or tag available staff in <#general> for minor issues.' },
            { q: 'Are there voice chat requirements?', a: 'Some tier tests require voice chat. Ensure you can join a voice channel when requested by the tester.' },
            { q: 'Do tiers reset?', a: 'Tiers are permanent unless you are caught cheating, in which case all tiers are revoked.' },
            { q: 'Can I have tiers in multiple modes?', a: 'Yes! You can be tested and ranked in every mode independently.' },
            { q: 'What is the Staff Application process?', a: 'Apply in <#roles>. Applications are reviewed weekly. Requirements: Active in the community, no recent punishments, mature.' },
            { q: 'Is there a Discord bot?', a: 'Yes — our custom bot handles tier testing, verification, ticketing, leaderboards, and more.' },
        ];
        const msgs = [embed('', header, 0x3498DB)];
        // Split into 2 FAQ messages (10 each)
        const mid = Math.ceil(faqs.length / 2);
        const groups = [faqs.slice(0, mid), faqs.slice(mid)];
        for (const group of groups) {
            const desc = group.map((f, i) => {
                return `**${f.q}**\n│ ${f.a}\n`;
            }).join('\n');
            msgs.push(embed('', desc, 0x3498DB));
        }
        const navRow = actionRow(btn('faq_general', 'General', discord_js_1.ButtonStyle.Primary), btn('faq_testing', 'Testing', discord_js_1.ButtonStyle.Primary), btn('faq_technical', 'Technical', discord_js_1.ButtonStyle.Primary));
        for (const m of msgs)
            await ch.send({ embeds: [m], components: [navRow] }).catch(() => { });
    }
    // ── VERIFY PANEL ─────────────────────────────────
    async panelVerify(ch) {
        const body = [
            `${SEP}`,
            ``,
            `         ${B1}ＶＥＲＩＦＩＣＡＴＩＯＮ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ *Verify your account to unlock full server access*`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `│  ◆  Link your Discord to your Minecraft IGN`,
            `│  ◆  Gain access to all channels`,
            `│  ◆  Unlock tier testing`,
            `│  ◆  Appear on the global leaderboard`,
            `│  ◆  Receive the **Verified** role`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**How it works:**`,
            ``,
            `1. Click the **Verify** button below`,
            `2. Enter your Minecraft IGN in the modal`,
            `3. You will receive your verified role instantly`,
            ``,
            `${'━'.repeat(16)} ◆ ${'━'.repeat(16)}`,
            ``,
            `*Verification takes less than 30 seconds.*`,
            ``,
            `${SEP}`,
        ].join('\n');
        const row = actionRow(btn('verify_button', 'Verify Now', discord_js_1.ButtonStyle.Success));
        await ch.send({ embeds: [embed('', body, 0x2ECC71)], components: [row] });
    }
    // ── TIER TEST PANEL ──────────────────────────────
    async panelTierTest(ch) {
        const body = [
            `${SEP}`,
            ``,
            `         ${B1}ＴＩＥＲ ＴＥＳＴＩＮＧ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ *Request a tier test and prove your skill*`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `│  **How Testing Works**`,
            `│  ─────────────────`,
            `│  1. Click the button below`,
            `│  2. Select your PvP mode`,
            `│  3. A tester will claim your ticket`,
            `│  4. You fight 3–5 rounds in the chosen mode`,
            `│  5. Tester assigns your tier based on performance`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Testing Guidelines**`,
            ``,
            `│  Duration: 5–15 minutes per test`,
            `│  Retest cooldown: 7 days per mode`,
            `│  Voice chat may be required`,
            `│  All fights are recorded for verification`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Supported Modes (20)**`,
            ``,
            `│  Sword │ Crystal │ SMP │ Netherite Pot │ Diamond Pot`,
            `│  BuildUHC │ UHC │ NoDebuff │ Gapple │ Combo`,
            `│  Boxing │ Bridge │ Anchor │ Mace │ Axe`,
            `│  Cart PvP │ Vanilla │ Bedwars │ Skywars │ Custom`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Tier System**`,
            ``,
            `│  LT1 ─  HT1 ─  LT2 ─  HT2 ─  LT3 ─  HT3 ─  LT4 ─  HT4 ─  LT5 ─  HT5`,
            `│  (Low)                                          (High)`,
            ``,
            `${'━'.repeat(16)} ◆ ${'━'.repeat(16)}`,
            ``,
            `*You must be verified before requesting a test.*`,
            ``,
            `${SEP}`,
        ].join('\n');
        const row = actionRow(btn('request_tier_test', 'Request Tier Test', discord_js_1.ButtonStyle.Primary));
        await ch.send({ embeds: [embed('', body, 0xE67E22)], components: [row] });
    }
    // ── QUEUE PANEL ──────────────────────────────────
    async panelQueue(ch) {
        const body = [
            `${SEP}`,
            ``,
            `         ${B1}ＴＥＳＴ ＱＵＥＵＥ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ *Active tier test tickets will appear here*`,
            ``,
            `${'━'.repeat(24)}`,
            ``,
            `│  **Current Queue**`,
            `│  ─────────────`,
            `│  No active tests.`,
            ``,
            `${'━'.repeat(24)}`,
            ``,
            `*This panel updates automatically.*`,
            `${SEP}`,
        ].join('\n');
        await ch.send({ embeds: [embed('', body, 0xF1C40F)] });
    }
    // ── APPLICATIONS PANEL ───────────────────────────
    async panelApplications(ch) {
        const body = [
            `${SEP}`,
            ``,
            `         ${B1}ＡＰＰＬＩＣＡＴＩＯＮＳ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ *Join the staff team or become a certified tier tester*`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Staff Application**`,
            ``,
            `│  Requirements:`,
            `│  ◆ Active in the community (1+ week)`,
            `│  ◆ No recent punishments`,
            `│  ◆ Mature and professional attitude`,
            `│  ◆ 14+ years old`,
            `│  ◆ Microphone for voice chat`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Tier Tester Application**`,
            ``,
            `│  Requirements:`,
            `│  ◆ HT3+ in the mode you wish to test`,
            `│  ◆ Deep knowledge of the mode mechanics`,
            `│  ◆ Fair and unbiased judgement`,
            `│  ◆ Active and available for tests`,
            `│  ◆ Previous testing experience preferred`,
            ``,
            `${'━'.repeat(16)} ◆ ${'━'.repeat(16)}`,
            ``,
            `*Applications are reviewed within 7 days.*`,
            `${SEP}`,
        ].join('\n');
        const row = actionRow(btn('staff_apply', 'Staff Apply', discord_js_1.ButtonStyle.Secondary), btn('tester_apply', 'Tester Apply', discord_js_1.ButtonStyle.Secondary));
        await ch.send({ embeds: [embed('', body, 0x9B59B6)], components: [row] });
    }
    // ── SUPPORT / TICKET PANEL ───────────────────────
    async panelSupport(ch) {
        const body = [
            `${SEP}`,
            ``,
            `         ${B1}ＳＵＰＰＯＲＴ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ *Need help? Open a ticket and staff will assist you*`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Available for:**`,
            ``,
            `│  ◆ General questions and inquiries`,
            `│  ◆ Bug reports and technical issues`,
            `│  ◆ Player reports with evidence`,
            `│  ◆ Ban / mute appeals`,
            `│  ◆ Suggestions and feedback`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Before opening a ticket:**`,
            ``,
            `│  1. Check the FAQ above — your question may already be answered`,
            `│  2. Ensure you have evidence ready for reports`,
            `│  3. Be clear and concise about your issue`,
            `│  4. Do not open multiple tickets for the same issue`,
            ``,
            `${'━'.repeat(16)} ◆ ${'━'.repeat(16)}`,
            ``,
            `*Abuse of the ticket system may result in a mute.*`,
            `${SEP}`,
        ].join('\n');
        const row = actionRow(btn('support_ticket', 'Open Support Ticket', discord_js_1.ButtonStyle.Danger));
        await ch.send({ embeds: [embed('', body, 0xF1C40F)], components: [row] });
    }
    // ── TIER GUIDE PANEL ─────────────────────────────
    async panelTierGuide(ch) {
        const body = [
            `${SEP}`,
            ``,
            `         ${B1}ＴＩＥＲ ＳＹＳＴＥＭ ＧＵＩＤＥ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ *Understanding HARVAL MC tier progression*`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Tier Progression**`,
            ``,
            `Every PvP mode has 10 tiers:`,
            ``,
            `┏━━━━━━━━┳━━━━━━━━┓`,
            `┃ Tier   ┃ Points ┃`,
            `┣━━━━━━━━╋━━━━━━━━┫`,
            `┃ HT 1   ┃  100   ┃`,
            `┃ LT 1   ┃   85   ┃`,
            `┃ HT 2   ┃   85   ┃`,
            `┃ LT 2   ┃   70   ┃`,
            `┃ HT 3   ┃   70   ┃`,
            `┃ LT 3   ┃   55   ┃`,
            `┃ HT 4   ┃   55   ┃`,
            `┃ LT 4   ┃   40   ┃`,
            `┃ HT 5   ┃   40   ┃`,
            `┃ LT 5   ┃   25   ┃`,
            `┗━━━━━━━━┻━━━━━━━━┛`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Tier Labels**`,
            ``,
            `│  LT = Low Tier   │  HT = High Tier`,
            `│  Lower number = higher skill`,
            ``,
            `**Example:** HT1 is the highest tier (100 pts),`,
            `LT5 is the entry tier (25 pts).`,
            ``,
            `${'━'.repeat(16)} ◆ ${'━'.repeat(16)}`,
            ``,
            `*You must be verified to receive your tier roles.*`,
            `${SEP}`,
        ].join('\n');
        await ch.send({ embeds: [embed('', body, 0x00BCD4)] });
    }
    // ── LEADERBOARDS PANEL ───────────────────────────
    async panelLeaderboards(ch) {
        const body = [
            `${SEP}`,
            ``,
            `         ${B1}ＬＥＡＤＥＲＢＯＡＲＤ${B2}`,
            ``,
            `${SEP}`,
            ``,
            `▸ *Top players ranked by tier points*`,
            ``,
            `${'━'.repeat(32)}`,
            ``,
            `**Global Leaderboard**`,
            ``,
            `Use \`/leaderboard\` to view the top 20 players.`,
            ``,
            `│  Ranks by total points across all modes`,
            `│  Tiers are shown per-mode`,
            `│  Points accumulate with each tier earned`,
            ``,
            `${'━'.repeat(16)} ◆ ${'━'.repeat(16)}`,
            ``,
            `*Compete for the #1 spot!*`,
            `${SEP}`,
        ].join('\n');
        await ch.send({ embeds: [embed('', body, 0xFFD700)] });
    }
    // ─────────────────────────────────────────────────
    //  TICKET
    // ─────────────────────────────────────────────────
    async createTicket(mode, player) {
        const cat = this.findCat('tickets');
        if (!cat)
            return null;
        const slug = mode.replace(/\s+/g, '-').toLowerCase();
        const name = `ticket-${slug}-${player.displayName}`.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 100);
        const everyone = this.guild.roles.everyone;
        const overwrites = [
            { id: everyone.id, deny: [discord_js_1.PermissionFlagsBits.ViewChannel] },
            { id: player.id, allow: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.SendMessages, discord_js_1.PermissionFlagsBits.ReadMessageHistory] },
        ];
        try {
            const ch = await this.guild.channels.create({ name, type: discord_js_1.ChannelType.GuildText, parent: cat, permissionOverwrites: overwrites });
            const body = [
                `${SEP}`,
                ``,
                `         ${B1}ＴＩＣＫＥＴ${B2}`,
                ``,
                `${SEP}`,
                ``,
                `**Mode:** ${mode}`,
                `**Player:** ${player.displayName}`,
                `**Status:** Waiting for tester...`,
                ``,
                `${SEP}`,
            ].join('\n');
            const claimRow = actionRow(btn('ticket_claim', 'Claim', discord_js_1.ButtonStyle.Success), btn('ticket_close', 'Close', discord_js_1.ButtonStyle.Danger));
            await ch.send({ embeds: [embed('', body, 0xF1C40F)], components: [claimRow] });
            return ch;
        }
        catch (e) {
            Logger_1.logger.error(`Ticket fail: ${e.message}`);
            return null;
        }
    }
    // ─────────────────────────────────────────────────
    //  CLEANUP — tracked, NEVER mixed
    // ─────────────────────────────────────────────────
    async cleanupChannels() {
        let count = 0;
        for (const [, ch] of this.guild.channels.cache) {
            await ch.delete().catch(() => { });
            count++;
        }
        return count;
    }
    async cleanupRoles() {
        let count = 0;
        for (const [, r] of this.guild.roles.cache) {
            if (r.name === '@everyone' || r.managed)
                continue;
            await r.delete().catch(() => { });
            count++;
        }
        return count;
    }
    async cleanupPanels() {
        let count = 0;
        const panelKeys = ['welcome', 'rules', 'faq', 'verify', 'request-test', 'queue', 'roles', 'create-ticket', 'tier-guide', 'leaderboards'];
        for (const key of panelKeys) {
            const ch = this.tc(key);
            if (ch) {
                try {
                    const msgs = await ch.messages.fetch({ limit: 50 });
                    const deleted = await ch.bulkDelete(msgs.filter(m => m.author.id === this.guild.client.user?.id), true);
                    count += deleted.size;
                }
                catch { }
            }
        }
        return count;
    }
    async cleanupLogs() {
        let count = 0;
        const logKeys = ['ticket-logs', 'tier-logs', 'bot-logs', 'error-logs', 'join-leave', 'role-logs', 'verification-logs', 'command-logs'];
        for (const key of logKeys) {
            const ch = this.tc(key);
            if (ch) {
                await ch.delete().catch(() => { });
                count++;
            }
        }
        return count;
    }
    async cleanupAll() {
        const channels = await this.cleanupChannels();
        let roles = 0;
        for (const [, r] of this.guild.roles.cache) {
            if (r.name === '@everyone' || r.managed)
                continue;
            await r.delete().catch(() => { });
            roles++;
        }
        const panels = await this.cleanupPanels();
        const logs = await this.cleanupLogs();
        return { channels, roles, panels, logs };
    }
}
exports.ServerSetup = ServerSetup;
