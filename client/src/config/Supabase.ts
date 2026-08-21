import { createBrowserClient } from '@supabase/ssr';

const PROJECT_URL = import.meta.env.VITE_PROJECT_URL;
const PUBLISHABLE_KEY = import.meta.env.VITE_PUBLISHABLE_KEY;

export const supabase = createBrowserClient(PROJECT_URL, PUBLISHABLE_KEY);
