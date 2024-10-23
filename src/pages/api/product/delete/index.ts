import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(200).send("Method not allowed");
    }

    const { id } = req.body;

    if (!id) {
        return res.status(422).send("Invalid data");
    }

    const deletedProduct = db.product.delete({
        where: {
            id
        }
    });

    if (!deletedProduct)
        return res.status(500).send("Failed to delete product");

    return res.status(200).send(deletedProduct);
}

export default handler;