import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        if (req.method !== 'POST') {
            return res.status(405).send({ message: "Method not allowed" });
        }

        const { image, title, description, price, userId } = req.body;

        if (!image || !title || !description || !price) {
            return res.status(422).send({ message: "Invalid or missing data" });
        }

        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            return res.status(422).send({ message: "Invalid price" });
        }

        const newProduct = await db.product.create({
            data: {
                imageUrl: image,
                title,
                description,
                price: numericPrice,
                user: {
                    connect: {
                        id: userId,
                    },
                }
            }
        });

        return res.status(201).send(newProduct);

    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).send({ message: "Failed to create product" });
    }
}

export default handler;
