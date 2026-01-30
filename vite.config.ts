import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    test: {
        expect: { requireAssertions: true },
        projects: [
            {
                extends: './vite.config.ts',
                test: {
                    name: 'client',
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium', headless: true }],
                    },
                    include: ['tests/**/*.page.{test,spec}.{js,ts}'],
                },
            },

            {
                extends: './vite.config.ts',
                test: {
                    name: 'server',
                    environment: 'node',
                    include: ['tests/**/*.{test,spec}.{js,ts}'],
                    exclude: ['tests/**/*.page.{test,spec}.{js,ts}'],
                },
            },
        ],
    },
});
