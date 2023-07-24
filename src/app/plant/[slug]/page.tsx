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
    <main>
      <div className="container mx-auto">
        <PlantDetail
          img={plantData[0].img}
          name={plantData[0].name}
          category={plantData[0].category}
          light={plantData[0].light}
          water={plantData[0].water}
          fullDescription={plantData[0].fullDescription}
        ></PlantDetail>

        <h3>Toutes les plantes de la catégorie "{plantData[0].category}" :</h3>

        {plantsByCategory.length <= 0 ? (
          "Aucune plante"
        ) : (
          <section className="row">
            {plantsByCategory.map((plant) => (
              <div className="col-3">
                <a href={`/plant/${plant.id}`}>
                  <img className="img-fluid" src={plant.img} alt={plant.name} />
                  <span>{firstLetterToCapitalize(plant.name)}</span>
                </a>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
