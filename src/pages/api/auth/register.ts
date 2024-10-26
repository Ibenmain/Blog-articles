
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import db from '../../../lib/db';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).send('User already exists with that email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).send({ message: 'User created successfuly', user });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
}

export default handler;
