'use server'

import { getSupabase } from '@/lib/supabase'

export interface ContactState {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<'name' | 'email' | 'message', string>>
  /** Echoed back so the form keeps what was typed after a failed submit */
  values?: { name: string; email: string; message: string }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real people never fill this hidden field
  if (form.get('company_website')) return { status: 'success' }

  const name = String(form.get('name') ?? '').trim()
  const email = String(form.get('email') ?? '').trim()
  const topic = String(form.get('topic') ?? '').trim()
  const body = String(form.get('message') ?? '').trim()

  const values = { name, email, message: body }
  const fieldErrors: ContactState['fieldErrors'] = {}
  if (name.length < 2) fieldErrors.name = 'Please add your name.'
  if (!EMAIL_RE.test(email)) fieldErrors.email = 'That email doesn’t look right.'
  if (body.length < 10) fieldErrors.message = 'A sentence or two helps me reply properly.'
  if (Object.keys(fieldErrors).length) return { status: 'error', fieldErrors, values }

  const supabase = getSupabase()
  if (!supabase) {
    return { status: 'error', message: 'The form is offline right now — please email me directly.', values }
  }

  const message = topic ? `[${topic}] ${body}` : body
  const { error } = await supabase.from('contacts').insert([{ name, email, message: message.slice(0, 5000) }])
  if (error) {
    console.error('[contact] insert failed:', error.message)
    return { status: 'error', message: 'Something went wrong sending that — please email me directly.', values }
  }
  return { status: 'success' }
}
