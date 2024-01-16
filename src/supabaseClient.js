import { createClient } from '@supabase/supabase-js'
import key from './key.js'
export const supabase = createClient('https://sgrtrvnslhhjwrclsvtw.supabase.co', key())