type Message = {
  role: string;
  content: string;
};

export async function getFinancialAdvice(messages: Message[]) {
  const res = await fetch('/api/advice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();
  console.log('API returned:', data);
  return data;
}