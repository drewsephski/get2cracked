import { NextResponse } from 'next/server';

type VoiceProvider = 'HUME_AI' | 'CUSTOM_VOICE';

interface Voice {
  id: string;
  name: string;
  provider: VoiceProvider;
}

interface VoiceListResponse {
  page_number: number;
  page_size: number;
  total_pages: number;
  voices_page: Voice[];
}

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const apiKey = process.env.HUME_API_KEY;
    
    if (!apiKey) {
      console.error('Hume API key is not configured');
      return NextResponse.json(
        { 
          error: 'Hume API key not configured',
          details: 'Please set the HUME_API_KEY environment variable in your .env.local file'
        },
        { status: 500 }
      );
    }

    // Get query parameters with proper typing
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider') as VoiceProvider || 'HUME_AI';
    const pageNumber = parseInt(searchParams.get('page_number') || '0', 10);
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('page_size') || '10', 10)));
    const ascendingOrder = searchParams.get('ascending_order') === 'true';

    // Build URL with query parameters
    const url = new URL('https://api.hume.ai/v0/tts/voices');
    url.searchParams.append('provider', provider);
    url.searchParams.append('page_number', pageNumber.toString());
    url.searchParams.append('page_size', pageSize.toString());
    if (ascendingOrder) {
      url.searchParams.append('ascending_order', 'true');
    }

    const response = await fetch(url.toString(), {
      headers: {
        'X-Hume-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorDetails = 'Unknown error';
      try {
        const errorData = await response.text();
        console.error('Hume API error response:', errorData);
        const jsonError = JSON.parse(errorData);
        errorDetails = jsonError.message || errorData;
      } catch (e) {
        errorDetails = await response.text();
      }
      
      console.error(`Hume API error (${response.status}):`, errorDetails);
      return NextResponse.json(
        { 
          error: 'Failed to fetch voices from Hume API',
          details: errorDetails,
          status: response.status 
        },
        { status: response.status }
      );
    }

    const data: VoiceListResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/hume/voices:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
