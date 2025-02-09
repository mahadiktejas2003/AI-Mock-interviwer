import { defineConfig } from 'drizzle-kit';
import { loadEnvConfig } from '@next/env'

export default defineConfig({
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_6UTk3jdLOMnN@ep-cold-king-a86evg9u-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
});