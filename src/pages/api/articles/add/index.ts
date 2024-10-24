import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Method not allowed' });
    }

    const { title, content, userId } = req.body as { title: string, content: string, userId: string };

    if (!title || !content || !userId) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    try {
        const article = await db.article.create({
            data: {
                title,
                content,
                userId: userId,
            },
        });
        return res.status(201).send(article);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
}

export default handler;