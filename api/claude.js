// Vercel Serverless Function: Anthropic API 프록시
// 브라우저는 이 함수를 호출하고, 이 함수가 서버 쪽에서 Anthropic API를 대신 호출해줌
// (서버끼리 통신이라 CORS 문제 없음)

export default async function handler(req, res) {
  // CORS 허용 (캡틴짐 깃헙 페이지에서만 호출 가능하도록)
  res.setHeader('Access-Control-Allow-Origin', '*'); // 필요시 특정 도메인으로 제한 가능
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY; // Vercel 환경변수에서 읽음 (코드에 노출 안 됨)
    if (!apiKey) {
      res.status(500).json({ error: 'API key not configured' });
      return;
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await anthropicRes.json();
    res.status(anthropicRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Proxy error' });
  }
}
