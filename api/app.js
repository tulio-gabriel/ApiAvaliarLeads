export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { nome, email, empresa, funcionarios } = req.body;


  let score = 0;

  if (nome) score += 15;
  
  if(empresa) score += 15;

  if (funcionarios >=1 && funcionarios <= 10) score += 10;
  else if (funcionarios >= 11 && funcionarios <= 50) score += 20;
  else if (funcionarios >= 51 && funcionarios <= 200) score += 30;
  else if (funcionarios > 200) score += 50;

  const isCorporateEmail = !/@(gmail|hotmail|yahoo|outlook)\.com$/i.test(email || '');
  if (isCorporateEmail) score += 20;

  return res.status(200).json({
    lead_score: score,
    is_qualified: score >= 50 ? true : false,
  });
}