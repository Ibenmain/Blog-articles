import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        return res.status(405).send({ message: 'Method not allowed' });
    }

    const { id, title, content } = req.body as { id: string, title: string, content: string };

    if (!id || !title || !content) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const article = await db.article.update({
            where: {
                id: id,
            },
            data: {
                title,
                content,
            },
        });
        return res.status(200).send(article);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
}

export default handler;