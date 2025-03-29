import React from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface AccommodationCardProps {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  location: string;
  description: string;
}

const AccommodationCard = ({
  id,
  title,
  price,
  rating,
  image,
  location,
  description,
}: AccommodationCardProps) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm mb-4 rtl">
      <div className="md:w-1/3 h-48 md:h-auto relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium">
          جديد
        </div>
      </div>
      <div className="md:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-primary">{title}</h3>
            <div className="flex items-center">
              <span className="font-bold text-primary ml-1">{rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{location}</p>
          <p className="text-sm mb-4">{description}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-primary">
            {price} ر.س <span className="text-sm font-normal">/ ليلة</span>
          </div>
          <Link to={`/accommodation/${id}`}>
            <Button className="bg-primary text-white hover:bg-primary/90">
              تفاصيل الفندق
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;