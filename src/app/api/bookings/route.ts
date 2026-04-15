import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tier, sqFootage, hours, estimatedPrice, clientName, clientEmail, clientPhone, preferredDate, preferredTime, specialInstructions } = body

    // Validate required fields
    if (!tier || !estimatedPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create booking in database
    const booking = await db.booking.create({
      data: {
        tier,
        hours: hours || 2, // Default to 2 hours if not provided
        estimatedPrice: parseFloat(estimatedPrice.toString()),
        status: 'pending',
        clientName: clientName || null,
        clientEmail: clientEmail || null,
        clientPhone: clientPhone || null,
        preferredDate: preferredDate || null,
        preferredTime: preferredTime || null,
        specialInstructions: specialInstructions || null,
      }
    })

    // In a real application, you would also:
    // 1. Send confirmation email to the client
    // 2. Notify the assigned specialist
    // 3. Integrate with a scheduling service like Launch27

    // Log the booking for demonstration purposes
    console.log('New booking request:', booking)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Booking request received successfully',
      booking: {
        id: booking.id,
        tier: booking.tier,
        hours: booking.hours,
        estimatedPrice: booking.estimatedPrice,
        status: booking.status,
        createdAt: booking.createdAt,
      }
    })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get endpoint to retrieve booking status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const bookingId = searchParams.get('id')

  if (bookingId) {
    try {
      const booking = await db.booking.findUnique({
        where: { id: bookingId }
      })

      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        id: booking.id,
        tier: booking.tier,
        hours: booking.hours,
        estimatedPrice: booking.estimatedPrice,
        status: booking.status,
        createdAt: booking.createdAt
      })
    } catch (error) {
      console.error('Error fetching booking:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({
    message: 'Bookings API endpoint',
    endpoints: {
      POST: '/api/bookings - Create a new booking',
      GET: '/api/bookings?id={bookingId} - Get booking status'
    }
  })
}
