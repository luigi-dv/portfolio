import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([...nextVitals, globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'private/**']), {
    plugins: {
        perfectionist,
    },
    rules: {
        'perfectionist/sort-exports': [
            'error',
            {
                ignoreCase: true,
                order: 'asc',
                partitionByComment: false,
                partitionByNewLine: false,
                specialCharacters: 'keep',
                type: 'alphabetical',
            },
        ],
        "perfectionist/sort-imports": ["error", {
            customGroups: [
                { elementNamePattern: ['^react$', '^react-.+'], groupName: 'react' },
                { elementNamePattern: '@/components/.*$', groupName: 'components' },
                { elementNamePattern: '@/constants/.*$', groupName: 'constants' },
                { elementNamePattern: '@/data/.*$', groupName: 'data' },
                { elementNamePattern: '@/lib/.*$', groupName: 'lib' },
                { elementNamePattern: '@/providers/.*$', groupName: 'providers' },
                { elementNamePattern: '@/services/.*$', groupName: 'services' },
                { elementNamePattern: '@/types/.*$', groupName: 'types' },
            ],
            groups: [
                'react',
                'components',
                'constants',
                'data',
                'lib',
                'providers',
                'services',
                'types',
                'type-import',
                ['value-builtin', 'value-external'],
                'type-internal',
                'value-internal',
                ['type-parent', 'type-sibling', 'type-index'],
                ['value-parent', 'value-sibling', 'value-index'],
                'unknown',
            ],
            internalPattern: ["@/lib/.*$", "@/services/.*$", "@/components/.*$", "@/types/.*$", "@/data/.*$", "@/constants/.*$", "@/providers/.*$"],
            newlinesBetween: 1,
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
}]);
