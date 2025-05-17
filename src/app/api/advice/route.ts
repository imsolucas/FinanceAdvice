import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
	try {
		const { messages } = await req.json();

		if (!messages || !Array.isArray(messages) || messages.length === 0) {
			return NextResponse.json({ error: 'Invalid or missing messages array' }, { status: 400 });
		}

		const requestBody = {
			input: { messages },
			parameters: {},
			debug: {},
		};

		const response = await axios.post(
			`${process.env.ALIBABA_API_URL}`,
			requestBody,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.ALIBABA_API_KEY}`,
				},
			}
		);

		return NextResponse.json(response.data);
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error('DashScope App API Error:', error.response?.data || error.message);
		} else if (error instanceof Error) {
			console.error('DashScope App API Error:', error.message);
		} else {
			console.error('DashScope App API Error: Unknown error', error);
		}

		return NextResponse.json({ error: 'Failed to get financial advice' }, { status: 500 });
	}
}

