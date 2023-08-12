import { ReactNode } from "react";
import LikeButton from "./LikeButton";
import { calculNbEmoji, firstLetterToCapitalize } from "@/app/utils/general";

interface Props {
  img: string;
  link: ReactNode
  name: string;
  category: string;
  slug: string;
  light: number;
  water: number;
  description: string;
}

// Récupère les propriétés à partir des props ci-dessus
function PlantCard ({img, link, name, category, slug, light, water, description}: Props) {
  return (
    <div className="w-80 bg-white rounded-md" style={{minHeight: 545}} >
          <div className="flex justify-between p-3">
              <span className="text-stone-500">Catégorie : {category}</span>
              <span><LikeButton></LikeButton></span>
          </div>
          <a href={`/plant/${slug}`}>
            <img className="hover:opacity-75 transition-opacity h-80" height={320} width={320} src={img} alt={"plante " + name} />
          </a>
          <div className="p-3">
              <h2 className="text-xl font-semibold mb-3">{firstLetterToCapitalize(name)}</h2>
              <p className="mb-3">{description}</p>
              {link}
          </div>
          <div className="p-3">Eau: {calculNbEmoji(water, "💧")} Soleil: {calculNbEmoji(light, "☀️")}</div>
    </div>
  );
};

export default PlantCard;