import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Store contact submission in database
    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      }
    })

    // In a real application, you would also:
    // 1. Send notification email to your team
    // 2. Send confirmation email to the submitter
    // 3. Integrate with a CRM or email service like SendGrid/Mailgun

    // Log the contact submission for demonstration purposes
    console.log('New contact submission:', submission)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
