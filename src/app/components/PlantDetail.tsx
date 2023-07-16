import { calculNbEmoji, firstLetterToCapitalize } from "../utils";

interface Props {
    img: string;
    name: string;
    category: string;
    light: number;
    water: number;
    fullDescription: string;
  }

function PlantDetail({img, name, category, light, water, fullDescription}: Props) {
  return (
    <section>
        <h1 className="py-3 text-center">{firstLetterToCapitalize(name)}</h1>
        <img className="img-fluid" src={img} alt={"photo d'une plante " + name} />
        

        <h3 className="pt-4">Description :</h3>
        <p>{fullDescription}</p>

        <h3>Caractéristiques :</h3>
        <ul>
          <li>Besoin en eau: {calculNbEmoji(water, "💧")}</li>
          <li>Besoin en lumière: {calculNbEmoji(light, "☀️")}</li>
          <li>Catégorie: {category}</li>
        </ul>
    </section>
  )
}

export default PlantDetail