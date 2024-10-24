import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
        if (req.method !== 'GET') {
            return res.status(405).send({ message: 'Method not allowed' });
        }
    
        try {
            const articles = await db.article.findMany({
                select: {
                    id: true,
                    title: true,
                    content: true,
                },
            });
            return res.status(200).send(articles);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Something went wrong' });
        }
    }

export default handler;
