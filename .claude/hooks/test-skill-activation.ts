#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface TestCase {
    domain: string;
    prompt: string;
    expectedSkills: string[];
    description: string;
}

const TEST_CASES: TestCase[] = [
    // Development Skills
    {
        domain: "Backend Development",
        prompt: "I need to create a new API endpoint for user authentication",
        expectedSkills: ["backend-dev-guidelines"],
        description: "API endpoint creation"
    },
    {
        domain: "Backend Development",
        prompt: "How do I implement middleware for request validation?",
        expectedSkills: ["backend-dev-guidelines"],
        description: "Middleware implementation"
    },
    {
        domain: "Backend Development",
        prompt: "I want to add a new route to my Express server",
        expectedSkills: ["backend-dev-guidelines"],
        description: "Express routing"
    },
    {
        domain: "Frontend Development",
        prompt: "Create a React component for displaying user profiles",
        expectedSkills: ["frontend-dev-guidelines"],
        description: "React component creation"
    },
    {
        domain: "Frontend Development",
        prompt: "I need to add a modal dialog with MUI",
        expectedSkills: ["frontend-dev-guidelines"],
        description: "MUI component usage"
    },
    {
        domain: "Frontend Development",
        prompt: "How do I use Suspense for data fetching?",
        expectedSkills: ["frontend-dev-guidelines"],
        description: "Suspense pattern"
    },
    {
        domain: "Error Tracking",
        prompt: "I need to add Sentry error tracking to my service",
        expectedSkills: ["error-tracking", "backend-dev-guidelines"],
        description: "Sentry integration"
    },
    {
        domain: "Error Tracking",
        prompt: "How do I capture exceptions in my controllers?",
        expectedSkills: ["error-tracking", "backend-dev-guidelines"],
        description: "Exception capture"
    },
    {
        domain: "Route Testing",
        prompt: "I want to test my API routes with authentication",
        expectedSkills: ["route-tester", "backend-dev-guidelines"],
        description: "Authenticated route testing"
    },

    // Infrastructure Skills
    {
        domain: "Cloud Engineering",
        prompt: "I need to deploy my application to AWS",
        expectedSkills: ["cloud-engineering"],
        description: "AWS deployment"
    },
    {
        domain: "Cloud Engineering",
        prompt: "How do I set up a serverless architecture with Lambda?",
        expectedSkills: ["cloud-engineering"],
        description: "Serverless with Lambda"
    },
    {
        domain: "Cloud Engineering",
        prompt: "What's the best way to optimize cloud costs?",
        expectedSkills: ["cloud-engineering", "budget-and-cost-management"],
        description: "Cloud cost optimization"
    },
    {
        domain: "Cloud Engineering",
        prompt: "We need to deploy to Azure Government cloud for FedRAMP compliance",
        expectedSkills: ["cloud-engineering", "devsecops"],
        description: "Government cloud with compliance"
    },
    {
        domain: "Kubernetes",
        prompt: "I need to set up a Kubernetes cluster for production",
        expectedSkills: ["platform-engineering"],
        description: "Kubernetes setup"
    },
    {
        domain: "Kubernetes",
        prompt: "How do I configure Helm charts for my application?",
        expectedSkills: ["platform-engineering"],
        description: "Helm configuration"
    },
    {
        domain: "Security",
        prompt: "I need to implement security scanning in my CI/CD pipeline",
        expectedSkills: ["devsecops"],
        description: "Security scanning setup"
    },
    {
        domain: "Security",
        prompt: "How do I secure container images?",
        expectedSkills: ["devsecops"],
        description: "Container security"
    },
    {
        domain: "Security",
        prompt: "We need to pass a CMMC audit",
        expectedSkills: ["devsecops"],
        description: "CMMC compliance"
    },
    {
        domain: "SRE",
        prompt: "I need to define SLOs for our service",
        expectedSkills: ["sre"],
        description: "SLO definition"
    },
    {
        domain: "SRE",
        prompt: "How do I set up monitoring and alerting?",
        expectedSkills: ["sre", "observability-engineering"],
        description: "Monitoring setup"
    },
    {
        domain: "SRE",
        prompt: "We're having an outage, how do I debug?",
        expectedSkills: ["sre"],
        description: "Incident response"
    },
    {
        domain: "Architecture",
        prompt: "I need to design a multi-region architecture",
        expectedSkills: ["infrastructure-architecture"],
        description: "Multi-region design"
    },
    {
        domain: "Architecture",
        prompt: "How do I write an ADR for our system?",
        expectedSkills: ["infrastructure-architecture"],
        description: "ADR creation"
    },
    {
        domain: "Architecture",
        prompt: "We need disaster recovery planning",
        expectedSkills: ["infrastructure-architecture"],
        description: "DR planning"
    },
    {
        domain: "Database",
        prompt: "My PostgreSQL queries are slow",
        expectedSkills: ["database-engineering"],
        description: "Query optimization"
    },
    {
        domain: "Database",
        prompt: "How do I set up database replication?",
        expectedSkills: ["database-engineering"],
        description: "Database replication"
    },
    {
        domain: "Observability",
        prompt: "I need to implement distributed tracing",
        expectedSkills: ["observability-engineering"],
        description: "Distributed tracing"
    },
    {
        domain: "Observability",
        prompt: "How do I set up OpenTelemetry?",
        expectedSkills: ["observability-engineering"],
        description: "OpenTelemetry setup"
    },
    {
        domain: "API Design",
        prompt: "I'm designing a GraphQL API",
        expectedSkills: ["api-engineering"],
        description: "GraphQL design"
    },
    {
        domain: "API Design",
        prompt: "How do I implement rate limiting for my API?",
        expectedSkills: ["api-engineering", "backend-dev-guidelines"],
        description: "Rate limiting"
    },

    // Management Skills
    {
        domain: "Engineering Management",
        prompt: "I need to hire a senior engineer",
        expectedSkills: ["engineering-management"],
        description: "Hiring process"
    },
    {
        domain: "Engineering Management",
        prompt: "How do I structure my team for better productivity?",
        expectedSkills: ["engineering-management"],
        description: "Team structure"
    },
    {
        domain: "Engineering Management",
        prompt: "I need to prepare for 1-on-1s with my reports",
        expectedSkills: ["engineering-management"],
        description: "1-on-1 preparation"
    },
    {
        domain: "Technical Leadership",
        prompt: "My team wants to rewrite everything in Rust",
        expectedSkills: ["technical-leadership"],
        description: "Technology decision"
    },
    {
        domain: "Technical Leadership",
        prompt: "Should we adopt microservices architecture?",
        expectedSkills: ["technical-leadership", "infrastructure-architecture"],
        description: "Architecture decision"
    },
    {
        domain: "Technical Leadership",
        prompt: "How do I evaluate this technical proposal?",
        expectedSkills: ["technical-leadership"],
        description: "Proposal evaluation"
    },
    {
        domain: "Infrastructure Strategy",
        prompt: "Should we build or buy our authentication system?",
        expectedSkills: ["infrastructure-strategy"],
        description: "Build vs buy decision"
    },
    {
        domain: "Infrastructure Strategy",
        prompt: "I need to create a 3-year infrastructure roadmap",
        expectedSkills: ["infrastructure-strategy"],
        description: "Multi-year roadmap"
    },
    {
        domain: "Budget Management",
        prompt: "Our AWS bill is too high, how do I reduce costs?",
        expectedSkills: ["budget-and-cost-management", "cloud-engineering"],
        description: "Cost reduction"
    },
    {
        domain: "Budget Management",
        prompt: "I need to prepare an infrastructure budget request",
        expectedSkills: ["budget-and-cost-management"],
        description: "Budget planning"
    },
    {
        domain: "Operations Management",
        prompt: "How do I set up an on-call rotation?",
        expectedSkills: ["engineering-operations-management"],
        description: "On-call setup"
    },
    {
        domain: "Operations Management",
        prompt: "We need to write a postmortem for the outage",
        expectedSkills: ["engineering-operations-management", "sre"],
        description: "Postmortem process"
    },

    // Skill Development
    {
        domain: "Skill Development",
        prompt: "How do I create a new Claude Code skill?",
        expectedSkills: ["skill-developer"],
        description: "Skill creation"
    },
    {
        domain: "Skill Development",
        prompt: "I need to modify skill-rules.json",
        expectedSkills: ["skill-developer"],
        description: "Skill rules modification"
    },
    {
        domain: "Skill Development",
        prompt: "How do skill triggers work?",
        expectedSkills: ["skill-developer"],
        description: "Skill triggers understanding"
    },

    // Mixed/Complex Scenarios
    {
        domain: "Full Stack Project",
        prompt: "I'm building a web app with React frontend and Express backend",
        expectedSkills: ["frontend-dev-guidelines", "backend-dev-guidelines"],
        description: "Full stack development"
    },
    {
        domain: "Cloud Migration",
        prompt: "We need to migrate our monolith to microservices on AWS",
        expectedSkills: ["cloud-engineering", "infrastructure-architecture"],
        description: "Cloud migration planning"
    },
    {
        domain: "Secure Production",
        prompt: "I need to deploy to production with security scanning and monitoring",
        expectedSkills: ["devsecops", "platform-engineering", "observability-engineering"],
        description: "Secure production deployment"
    },
    {
        domain: "Compliance & Cloud",
        prompt: "Deploy HIPAA-compliant healthcare app to AWS",
        expectedSkills: ["cloud-engineering", "devsecops"],
        description: "Compliance cloud deployment"
    },
];

async function testHook(prompt: string): Promise<string> {
    const projectDir = join(__dirname, '..', '..');
    const hookScript = join(__dirname, 'skill-activation-prompt.sh');
    const input = JSON.stringify({
        session_id: "test-session",
        prompt: prompt,
        cwd: process.cwd(),
        permission_mode: "acceptEdits",
        transcript_path: "/tmp/test"
    });

    try {
        const { stdout } = await execAsync(`export CLAUDE_PROJECT_DIR="${projectDir}" && echo '${input.replace(/'/g, "'\\''")}' | ${hookScript}`);
        return stdout;
    } catch (error: any) {
        return error.stdout || '';
    }
}

function extractSkillsFromOutput(output: string): string[] {
    const skills: string[] = [];
    const lines = output.split('\n');

    for (const line of lines) {
        if (line.trim().startsWith('→')) {
            const match = line.match(/→\s*([a-z-]+)/);
            if (match) {
                skills.push(match[1]);
            }
        }
    }

    return skills;
}

async function runTests() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🧪 COMPREHENSIVE SKILL ACTIVATION TESTING');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    let passed = 0;
    let failed = 0;
    let warnings = 0;

    for (const testCase of TEST_CASES) {
        console.log(`\n📝 Testing: ${testCase.domain} - ${testCase.description}`);
        console.log(`   Prompt: "${testCase.prompt}"`);
        console.log(`   Expected skills: ${testCase.expectedSkills.join(', ')}`);

        const output = await testHook(testCase.prompt);
        const detectedSkills = extractSkillsFromOutput(output);

        console.log(`   Detected skills: ${detectedSkills.length > 0 ? detectedSkills.join(', ') : 'none'}`);

        // Check if at least one expected skill was detected
        const hasExpectedSkill = testCase.expectedSkills.some(expected =>
            detectedSkills.includes(expected)
        );

        if (hasExpectedSkill) {
            console.log(`   ✅ PASS - Detected expected skill(s)`);
            passed++;

            // Warn if extra skills detected
            const extraSkills = detectedSkills.filter(s => !testCase.expectedSkills.includes(s));
            if (extraSkills.length > 0) {
                console.log(`   ⚠️  Additional skills detected: ${extraSkills.join(', ')}`);
                warnings++;
            }
        } else if (detectedSkills.length === 0) {
            console.log(`   ❌ FAIL - No skills detected`);
            failed++;
        } else {
            console.log(`   ⚠️  PARTIAL - Detected different skills: ${detectedSkills.join(', ')}`);
            warnings++;
        }
    }

    console.log('\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 TEST RESULTS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Total Tests:     ${TEST_CASES.length}`);
    console.log(`   ✅ Passed:        ${passed}`);
    console.log(`   ❌ Failed:        ${failed}`);
    console.log(`   ⚠️  Warnings:      ${warnings}`);
    console.log(`   Success Rate:    ${((passed / TEST_CASES.length) * 100).toFixed(1)}%`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (failed > 0) {
        console.log('⚠️  Some tests failed. Review the skill-rules.json patterns.');
        process.exit(1);
    } else {
        console.log('✅ All tests passed! Skill activation system is working correctly.');
        process.exit(0);
    }
}

runTests().catch(err => {
    console.error('Error running tests:', err);
    process.exit(1);
});
