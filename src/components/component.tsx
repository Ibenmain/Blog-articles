import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, description, price }) => {
  return (
    <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <CardDescription className="text-gray-700">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-100">
        <div className="flex justify-between w-full items-center">
          <span className="text-xl font-semibold text-green-600">${price.toFixed(2)}</span>
          <div className="flex gap-2">
            <Button variant="outline"><Icon icon="weui:delete-outlined" /></Button>
            <Button variant="outline"><Icon icon="akar-icons:edit" /></Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
