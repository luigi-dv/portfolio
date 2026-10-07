import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([...nextVitals, globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']), {
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
}]);
