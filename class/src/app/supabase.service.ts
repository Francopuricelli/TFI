import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  client: SupabaseClient;

  constructor() {
    this.client = createClient('https://jsyrzsngnfcdalwbnlmu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeXJ6c25nbmZjZGFsd2JubG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzODk0NzEsImV4cCI6MjA3MTk2NTQ3MX0.Zhnhm6RH0JVAJqTyue_dWkRqmnFoxlBhy1g9XaMLWaw', {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }
}
