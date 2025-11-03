#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SKILLS_DIR = join(__dirname, '..', 'skills');
const BANNER_WIDTH = 80;
const BANNER_CHAR = '━';

function createActivationBanner(skillName: string): string {
    const banner = BANNER_CHAR.repeat(BANNER_WIDTH);
    const activationText = `🎯 SKILL ACTIVATED: ${skillName}`;

    return `\n${banner}\n${activationText}\n${banner}\n`;
}

function hasActivationBanner(content: string): boolean {
    return content.includes('🎯 SKILL ACTIVATED:');
}

function extractSkillName(content: string, filePath: string): string | null {
    // Try to extract from frontmatter
    const match = content.match(/^---\s*\nname:\s*(.+?)\s*\n/m);
    if (match) {
        return match[1];
    }

    // Fallback: derive from directory name
    const dirName = filePath.split('/').slice(-2, -1)[0];
    if (dirName && dirName !== 'skills') {
        return dirName;
    }

    return null;
}

function addBannerToSkill(filePath: string): void {
    console.log(`Processing: ${filePath}`);

    const content = readFileSync(filePath, 'utf-8');

    // Check if banner already exists
    if (hasActivationBanner(content)) {
        console.log(`  ✓ Banner already exists, skipping`);
        return;
    }

    // Extract skill name
    const skillName = extractSkillName(content, filePath);
    if (!skillName) {
        console.error(`  ✗ Could not extract skill name, skipping`);
        return;
    }

    // Find the end of frontmatter
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd === -1) {
        console.error(`  ✗ Could not find end of frontmatter, skipping`);
        return;
    }

    // Insert banner after frontmatter
    const beforeFrontmatter = content.substring(0, frontmatterEnd + 3);
    const afterFrontmatter = content.substring(frontmatterEnd + 3);

    const banner = createActivationBanner(skillName);
    const newContent = beforeFrontmatter + banner + afterFrontmatter;

    // Write back
    writeFileSync(filePath, newContent, 'utf-8');
    console.log(`  ✓ Added activation banner for: ${skillName}`);
}

function findSkillFiles(dir: string): string[] {
    const skillFiles: string[] = [];

    const entries = readdirSync(dir);
    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            const skillFilePath = join(fullPath, 'SKILL.md');
            try {
                if (statSync(skillFilePath).isFile()) {
                    skillFiles.push(skillFilePath);
                }
            } catch {
                // File doesn't exist, skip
            }
        }
    }

    return skillFiles;
}

function main() {
    console.log('Adding activation banners to all skills...\n');

    const skillFiles = findSkillFiles(SKILLS_DIR);
    console.log(`Found ${skillFiles.length} skill files\n`);

    let processed = 0;
    let skipped = 0;
    let errors = 0;

    for (const filePath of skillFiles) {
        try {
            const content = readFileSync(filePath, 'utf-8');
            if (hasActivationBanner(content)) {
                skipped++;
            } else {
                addBannerToSkill(filePath);
                processed++;
            }
        } catch (err) {
            console.error(`  ✗ Error processing ${filePath}:`, err);
            errors++;
        }
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`✅ Summary:`);
    console.log(`   Processed: ${processed}`);
    console.log(`   Skipped:   ${skipped}`);
    console.log(`   Errors:    ${errors}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

main();
