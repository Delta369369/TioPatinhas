import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({base: process.env.SITE_BASE || '/', plugins: [tailwindcss()]});
