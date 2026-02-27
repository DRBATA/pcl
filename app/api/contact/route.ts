import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OUTLOOK_EMAIL || !process.env.OUTLOOK_APP_PASSWORD) {
      console.error('OUTLOOK_EMAIL or OUTLOOK_APP_PASSWORD is not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_APP_PASSWORD,
      },
    })

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

    try {
      await transporter.sendMail({
        from: process.env.OUTLOOK_EMAIL,
        to: 'claire.lloyd@prostatecare.co.uk',
        cc: 'brian.lynch@prostatecare.co.uk',
        replyTo: email,
        subject,
        text: textBody,
      })
      console.log('Email sent successfully via Outlook')
      return NextResponse.json({ success: true })
    } catch (emailError) {
      console.error('Outlook SMTP error:', emailError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
