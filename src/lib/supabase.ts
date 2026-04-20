import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tizgjhomyxgewsmjjxok.supabase.co"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpemdqaG9teXhnZXdzbWpqeG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1Mzk0OTQsImV4cCI6MjA5MjExNTQ5NH0.pvfjSInQA4gFKbK10RedYN41fzleO2MokS-x8jZfFVw"

export const supabase = createClient(supabaseUrl, supabaseKey)