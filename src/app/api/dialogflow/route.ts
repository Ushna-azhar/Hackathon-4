import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: Request) {
  const { message } = await req.json();

  const dialogflowApiUrl = 'https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/YOUR_SESSION_ID:detectIntent';
  
  const response = await fetch(dialogflowApiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // Replace with your Dialogflow token
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      queryInput: {
        text: {
          text: message,
          languageCode: 'en',
        },
      },
    }),
  });

  const data = await response.json();
  const botResponse = data.queryResult.fulfillmentText;

  return NextResponse.json({ botResponse });
}
