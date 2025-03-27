import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from '~/config/site';

export default defineConfig({
  schema: '~/server/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
