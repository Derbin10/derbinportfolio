'use client'

import { useActionState, useState } from 'react'
import { sendMessage, type ContactState } from '@/app/contact/actions'
import { site } from '@/content/site'
import { ArrowRight } from './icons'

const topics = ['Full-time role', 'Brand identity', 'Mascot / character', 'Campaign & social', 'Something else']

export default function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendMessage, { status: 'idle' })
  const [topic, setTopic] = useState(topics[0])

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-accent/50 bg-accent/10 p-10 md:p-14">
        <p className="eyebrow mb-6 text-accent-text">Message sent</p>
        <p className="font-display text-h2 font-bold">
          Thank you<span className="text-accent">.</span>
        </p>
        <p className="mt-4 max-w-[40ch] text-fg-2">I’ll get back to you within a day or two.</p>
      </div>
    )
  }

  const errors = state.fieldErrors ?? {}
  const values = state.values

  return (
    <form action={action} noValidate className="space-y-10">
      <fieldset>
        <legend className="eyebrow mb-4 text-muted">What’s it about?</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <label
              key={t}
              className={`flex h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-text ${
                topic === t ? 'border-accent bg-accent text-on-accent' : 'border-line-strong text-fg-2 hover:border-fg hover:text-fg'
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={t}
                checked={topic === t}
                onChange={() => setTopic(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-10 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" error={errors.name} defaultValue={values?.name} />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
          defaultValue={values?.email}
        />
      </div>
      <Field label="Tell me about it" name="message" textarea error={errors.message} defaultValue={values?.message} />

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary group h-14 px-8 text-base disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Send message'}
          <ArrowRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
        </button>
        {state.message && (
          <p role="alert" className="text-sm text-danger">
            {state.message}{' '}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </p>
        )}
      </div>
    </form>
  )
}

interface FieldProps {
  label: string
  name: string
  type?: string
  autoComplete?: string
  textarea?: boolean
  error?: string
  defaultValue?: string
}

function Field({ label, name, type = 'text', autoComplete, textarea, error, defaultValue }: FieldProps) {
  const id = `f-${name}`
  const cls =
    'peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-lg outline-none transition-colors placeholder:text-transparent focus:border-accent-text focus:ring-0 ' +
    (error ? 'border-danger' : 'border-line-strong')
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-fg-2">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} name={name} rows={4} defaultValue={defaultValue} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={`${cls} resize-none`} />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cls}
        />
      )}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
