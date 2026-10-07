import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import perfectionist from 'eslint-plugin-perfectionist'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    allConfig: js.configs.all,
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [...compat.extends("next/core-web-vitals"), {
    plugins: {
        perfectionist,
    },
    rules: {
        'perfectionist/sort-exports': [
            'error',
            {
                groupKind: 'mixed',
                ignoreCase: true,
                order: 'asc',
                partitionByComment: false,
                partitionByNewLine: false,
                specialCharacters: 'keep',
                type: 'alphabetical',
            },
        ],
        "perfectionist/sort-imports": ["error", {
            customGroups: {
                type: {
                    components: '@/components/.*$',
                    constants: '@/constants/.*$',
                    data: '@/data/.*$',
                    lib: '@/lib/.*$',
                    providers: '@/providers/.*$',
                    react: ['^react$', '^react-.+'],
                    services: '@/services/.*$',
                    types: '@/types/.*$',
                },
                value: {
                    react: ['^react$', '^react-.+'],
                },
            },
            groups: [
                'react',
                'components',
                'constants',
                'data',
                'lib',
                'providers',
                'services',
                'types',
                'type',
                ['builtin', 'external'],
                'internal-type',
                'internal',
                ['parent-type', 'sibling-type', 'index-type'],
                ['parent', 'sibling', 'index'],
                'object',
                'unknown',
            ],
            internalPattern: ["@/lib/.*$", "@/services/.*$", "@/components/.*$", "@/types/.*$", "@/data/.*$", "@/constants/.*$", "@/providers/.*$"],
            newlinesBetween: "always",
            order: "asc",
            type: "line-length",
        }],
        "perfectionist/sort-objects": ['error', {
            type: 'alphabetical',
        }],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
}];