import { calculNbEmoji, firstLetterToCapitalize } from "@/app/utils";

interface Props {
    img: string;
    name: string;
    category: string;
    light: number;
    water: number;
    fullDescription: string;
  }

export default function PlantDetail ({img, name, category, light, water, fullDescription}: Props) {
  return (
    <section>
        <div className="w-11/12 md:w-9/12 lg:w-7/12 mx-auto bg-white p-5 rounded-md mt-10">
          <h1 className="pb-4 text-5xl text-center">{firstLetterToCapitalize(name)}</h1>
          <img width={557} height={557} className="mx-auto" src={img} alt={"photo d'une plante " + name} />
          
          <h2 className="pt-6 pb-2 font-semibold text-xl">Description :</h2>
          <p className="pb-5">{fullDescription}</p>

          <h3 className="font-semibold text-lg pb-2">Caractéristiques :</h3>
          <ul className="leading-7">
            <li>Arrosage: {calculNbEmoji(water, "💧")}</li>
            <li>Exposition: {calculNbEmoji(light, "☀️")}</li>
            <li>Catégorie: {firstLetterToCapitalize(category)}</li>
          </ul>
        </div>
    </section>
  )
}