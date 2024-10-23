import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        return res.status(200).send("Method not allowed");
    }

    const { id, imageUrl, title, description, price, } = req.body;

    if (!id || !imageUrl || !title || !description || !price) {
        return res.status(422).send("Invalid data");
    }

    const updatedProduct = db.product.update({
        where: {
            id
        },
        data: {
            imageUrl,
            title,
            description,
            price,
        }
    });

    if (!updatedProduct)
        return res.status(500).send("Failed to update product");

    return res.status(200).send(updatedProduct);
}

export default handler;