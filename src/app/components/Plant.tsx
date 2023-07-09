import { ReactNode } from "react";
import LikeButton from "./LikeButton";


interface Props {
  img: string;
  link: ReactNode
  name: string;
  category: string;
  light: number;
  water: number;
  description: string;
}

const calculNbEmoji = (nb: number, emoji: string) => {
    const arr = [];
    for (let index = 0; index < nb; index++) {
        arr.push(emoji);
    }
    return arr;
}

// Récupère les propriétés à partir des props ci-dessus
const Plant = ({img, link, name, category, light, water, description}: Props) => {
  return (
    <div className="col-6 mb-3 mb-sm-0">
        <div className="card" style={{minHeight: 428}}>
            <div className="card-header bg-white d-flex">
                <span className="col-6 text-secondary">Catégorie : {category}</span>
                <span className="col-6 text-end"><LikeButton></LikeButton></span>
            </div>
            <img src={img} className="card-img-top" alt={"plante " + name} />
            <div className="card-body">
                <h5 className="card-title">{(name.charAt(0).toLocaleUpperCase() + name.slice(1))}</h5>
                <p className="card-text">{description}</p>
                {link}
                <p></p>
            </div>
            <div className="card-footer bg-transparent">Eau: {calculNbEmoji(water, "💧")} Soleil: {calculNbEmoji(light, "☀️")}</div>
        </div>
    </div>
  );
};

export default Plant;