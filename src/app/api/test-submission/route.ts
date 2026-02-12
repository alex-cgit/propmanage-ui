import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Insert data into Supabase
    const { data, error } = await supabaseAdmin
      .from('test_submissions')
      .insert([
        {
          name,
          email,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      message: 'Data saved successfully',
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Fetch all test submissions
    const { data, error } = await supabaseAdmin
      .from('test_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
