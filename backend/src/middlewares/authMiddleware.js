import jwt from 'jsonwebtoken';
const SECRET_KEY = 'your-secret-key';

export default function (req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: 'Acesso negado' });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
