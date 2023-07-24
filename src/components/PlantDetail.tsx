import { calculNbEmoji, firstLetterToCapitalize } from "@/app/utils";

interface Props {
    img: string;
    name: string;
    category: string;
    light: number;
    water: number;
    fullDescription: string;
  }

function PlantDetail ({img, name, category, light, water, fullDescription}: Props) {
  return (
    <section>
        <h1 className="py-10 text-5xl text-center">{firstLetterToCapitalize(name)}</h1>
        <div className="w-11/12 md:w-9/12 lg:w-7/12 mx-auto bg-white p-5 rounded-md">
          <img src={img} alt={"photo d'une plante " + name} />
          
          <h2 className="pt-6 pb-2 font-semibold text-xl">Description :</h2>
          <p className="pb-5">{fullDescription}</p>

          <h3 className="font-semibold text-lg pb-2">Caractéristiques :</h3>
          <ul>
            <li>Besoin en eau: {calculNbEmoji(water, "💧")}</li>
            <li>Besoin en lumière: {calculNbEmoji(light, "☀️")}</li>
            <li>Catégorie: {category}</li>
          </ul>
        </div>
    </section>
  )
}
export default PlantDetail