import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        return res.status(405).send({ message: 'Method not allowed' });
    }
    
    const { id } = req.query as { id: string };

    if (!id) {
        return res.status(400).send({ message: 'Article ID is required' });
    }

    try {
        const article = await db.article.delete({
            where: {
                id: id,
            },
        });
        return res.status(200).send(article);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Something went wrong' });
    }
}

export default handler;