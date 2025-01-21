import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma-client.js';
import dotenv from 'dotenv';
import { promisify } from 'util';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY; // Use uma variável de ambiente

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ user: { email: user.email }, token: token });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export async function validateToken(req, res) {
  const verifyToken = promisify(jwt.verify);
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = await verifyToken(token, SECRET_KEY);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error('Erro na validação do token:', err);
    return res.status(401).json({ message: 'Token inválido' });
  }
}