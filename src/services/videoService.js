import {createClient} from "@supabase/supabase-js"

const PROJECT_URL = 'https://enlpoqalfhzzshzbsale.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVubHBvcWFsZmh6enNoemJzYWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDMwMjAsImV4cCI6MTk4Mzc3OTAyMH0.XGfTvFjHGUFMf0SjtAWOnCLH_NcQ9JEIDszvYZV3r58';
const supabase = createClient(PROJECT_URL,SUPABASE_KEY);

export function videoService(){
  return {
    getAllVideos(){
      return supabase.from("video").select("*")
    }
  }
}