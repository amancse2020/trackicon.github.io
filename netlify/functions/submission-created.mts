import type { Context } from '@netlify/functions'

const ADMIN_EMAIL = 'trackiconofficial@gmail.com'
const ADMIN_PHONE = '919795445292'
const SITE_NAME = 'TrackIcon'

type FormPayload = {
  form_name: string
  data: Record<string, string>
  created_at?: string
  site_url?: string
}

function escapeHtml(str: string): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildPlainMessage(data: Record<string, string>, createdAt?: string): string {
  const lines = [
    `New consultation request from ${SITE_NAME}`,
    '',
    `Name:    ${data.name || '-'}`,
    `Phone:   ${data.phone || '-'}`,
    `Email:   ${data.email || '-'}`,
    `Service: ${data.service || '-'}`,
    `Message: ${data.message || '-'}`,
  ]
  if (createdAt) lines.push('', `Submitted: ${createdAt}`)
  return lines.join('\n')
}

function buildHtmlMessage(data: Record<string, string>, createdAt?: string): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#52525B;font-size:12px;text-transform:uppercase;letter-spacing:1px">${label}</td><td style="padding:6px 12px;color:#15171B;font-size:14px">${escapeHtml(value || '-')}</td></tr>`
  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;background:#F5F5F5;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;border:1px solid #e5e7eb">
      <h2 style="margin:0 0 16px 0;color:#15171B">New consultation request</h2>
      <p style="margin:0 0 16px 0;color:#52525B;font-size:14px">A visitor submitted the contact form on ${SITE_NAME}.</p>
      <table style="width:100%;border-collapse:collapse;background:#FAFAFA;border-radius:8px;overflow:hidden">
        ${row('Name', data.name)}
        ${row('Phone', data.phone)}
        ${row('Email', data.email)}
        ${row('Service', data.service)}
        ${row('Message', data.message)}
        ${createdAt ? row('Submitted', createdAt) : ''}
      </table>
    </div></body></html>`
}

async function sendEmailViaResend(subject: string, text: string, html: string): Promise<{ ok: boolean; detail: string }> {
  const apiKey = Netlify.env.get('RESEND_API_KEY')
  if (!apiKey) return { ok: false, detail: 'RESEND_API_KEY not set' }
  const from = Netlify.env.get('NOTIFY_FROM_EMAIL') || 'TrackIcon <onboarding@resend.dev>'
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [ADMIN_EMAIL], subject, text, html, reply_to: undefined }),
  })
  const body = await res.text()
  return { ok: res.ok, detail: `${res.status} ${body.slice(0, 200)}` }
}

async function sendWhatsAppViaCallMeBot(text: string): Promise<{ ok: boolean; detail: string }> {
  const apiKey = Netlify.env.get('CALLMEBOT_API_KEY')
  if (!apiKey) return { ok: false, detail: 'CALLMEBOT_API_KEY not set' }
  const phone = Netlify.env.get('CALLMEBOT_PHONE') || ADMIN_PHONE
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`
  const res = await fetch(url)
  const body = await res.text()
  return { ok: res.ok, detail: `${res.status} ${body.slice(0, 200)}` }
}

export default async (req: Request, _context: Context) => {
  let payload: FormPayload
  try {
    const body = (await req.json()) as { payload: FormPayload }
    payload = body.payload
  } catch (err) {
    console.error('submission-created: invalid JSON body', err)
    return new Response('Bad Request', { status: 400 })
  }

  if (!payload || payload.form_name !== 'contact') {
    return new Response('Ignored', { status: 200 })
  }

  const data = payload.data || {}
  const createdAt = payload.created_at
  const subject = `New consultation request — ${data.name || 'Unknown'} (${data.service || 'No service'})`
  const text = buildPlainMessage(data, createdAt)
  const html = buildHtmlMessage(data, createdAt)
  const whatsappText = `*New consultation request — ${SITE_NAME}*\n\n` +
    `*Name:* ${data.name || '-'}\n` +
    `*Phone:* ${data.phone || '-'}\n` +
    `*Email:* ${data.email || '-'}\n` +
    `*Service:* ${data.service || '-'}\n` +
    `*Message:* ${data.message || '-'}`

  const [emailResult, whatsappResult] = await Promise.all([
    sendEmailViaResend(subject, text, html).catch((e) => ({ ok: false, detail: String(e) })),
    sendWhatsAppViaCallMeBot(whatsappText).catch((e) => ({ ok: false, detail: String(e) })),
  ])

  console.log('submission-created email:', emailResult)
  console.log('submission-created whatsapp:', whatsappResult)

  return Response.json({
    received: true,
    email: emailResult,
    whatsapp: whatsappResult,
  })
}
