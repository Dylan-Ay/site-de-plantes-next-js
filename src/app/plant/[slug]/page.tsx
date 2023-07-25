import PlantDetail from "@/components/PlantDetail";
import { plantList } from "@/components/data/listPlant";
import NotFound from "./not-found";
import { firstLetterToCapitalize } from "@/app/utils";
import { Metadata } from 'next';

// Dynamic title
type Props = {
  params: { slug: string }
}
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  // read route params
  const plantSlug = params.slug;
 
  // fetch data
  const plantData = plantList.filter((plant) => plant.slug === plantSlug);
 
  return {
    title: firstLetterToCapitalize(plantData[0].name)
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const plantSlug = params.slug;
  const plantData = plantList.filter((plant) => plant.slug === plantSlug);

  if (plantData.length === 0) {
    return NotFound();
  }
  // Récupère toutes les plantes de la même catégorie à part celle de la page
  const plantsByCategory = plantList.filter(
    (plant) => plant.category === plantData[0].category && plant.id !== plantSlug
  );

  return (
    <main className="container mx-auto">
      <section className="pb-9">
        <PlantDetail
          img={plantData[0].img}
          name={plantData[0].name}
          category={plantData[0].category}
          light={plantData[0].light}
          water={plantData[0].water}
          fullDescription={plantData[0].fullDescription}
        ></PlantDetail>
      </section>

      <section className="bg-white p-5 rounded-md">
        <h3 className="pb-4 font-semibold text-center text-lg">Toutes les plantes de la catégorie "{plantData[0].category}" :</h3>

        {plantsByCategory.length <= 0 ? (
          "Aucune plante"
        ) : (
          <div className="flex flex-wrap gap-5 justify-center">
            {plantsByCategory.map((plant) => (
              <div className="w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12 hover:opacity-75 transition-opacity">
                <a href={`/plant/${plant.slug}`}>
                  <img src={plant.img} alt={plant.name} />
                  <span>{firstLetterToCapitalize(plant.name)}</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
