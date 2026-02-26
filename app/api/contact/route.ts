import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { title, firstName, surname, email, selectedType, message } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const name = [title, firstName, surname].filter(Boolean).join(' ') || 'PCL website visitor'
    const subjectBase = selectedType ? selectedType.replace(/^\w/, (c: string) => c.toUpperCase()) : 'Website'
    const subject = `${subjectBase} enquiry from ${name}`

    const textBody = [
      'Hello Claire,',
      '',
      'A new enquiry was submitted on the Prostate Care website:',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Enquiry Type: ${selectedType || 'Not specified'}`,
      '',
      'Message:',
      message || '—',
      '',
      'Sent via prostatecare.co.uk',
    ].join('\n')

    const { error } = await resend.emails.send({
      from: 'claire.lloyd@prostatecare.co.uk',
      to: ['claire.lloyd@prostatecare.co.uk'],
      cc: ['brian.lynch@prostatecare.co.uk'],
      replyTo: email,
      subject,
      text: textBody,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
