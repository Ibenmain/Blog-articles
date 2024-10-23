import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(200).send("Method not allowed");
    }

    const products = await db.product.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            price: true,
            imageUrl: true,
        }
    });

    if (!products)
        return res.status(500).send("Failed to fetch products");

    return res.status(200).send(products);
}

export default handler;