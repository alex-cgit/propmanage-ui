import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messageId, rating, conversationId } = body

    // Validate input
    if (!messageId || !rating) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (rating !== 'up' && rating !== 'down') {
      return NextResponse.json(
        { success: false, error: 'Invalid rating value' },
        { status: 400 }
      )
    }

    // TODO: Store feedback in Supabase
    // For now, just log it
    console.log('Feedback received:', {
      messageId,
      rating,
      conversationId,
      timestamp: new Date().toISOString(),
    })

    // In production, you would save to database:
    // const { data, error } = await supabase
    //   .from('message_feedback')
    //   .insert({
    //     message_id: messageId,
    //     rating: rating,
    //     conversation_id: conversationId,
    //     created_at: new Date().toISOString()
    //   })

    return NextResponse.json({
      success: true,
      message: 'Feedback recorded successfully',
    })
  } catch (error) {
    console.error('Error processing feedback:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
