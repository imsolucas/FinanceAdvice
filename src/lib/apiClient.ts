// lib/apiClient.js
import axios from 'axios';

// lib/apiClient.ts
export async function getFinancialAdvice(messages: any) {
  const res = await fetch('/api/advice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();
  console.log('API returned:', data);
  return data;
}

