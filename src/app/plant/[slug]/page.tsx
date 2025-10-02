import PlantDetail from "@/components/PlantDetail";
import { plantList } from "@/components/data/listPlant";
import { firstLetterToCapitalize } from "@/app/utils/general";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Dynamic title
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const {slug} = await params;
  const plantData = plantList.find((plant) => plant.slug === slug);

  if (!plantData) {
    return { title: "Page introuvable - 404" };
  }

  return {
    title: firstLetterToCapitalize(plantData.name),
  };
}

export default async function Page({ params }: PageProps) {
  const {slug} = await params;
  const plantData = plantList.find((plant) => plant.slug === slug);

  if (!plantData) {
    notFound();
  }

  const plantsByCategory = plantList.filter(
    (plant) =>
      plant.category === plantData.category && plant.slug !== slug
  );

  return (
    <main className="container mx-auto">
      <section className="pb-9">
        <PlantDetail
          img={plantData.img}
          name={plantData.name}
          category={plantData.category}
          light={plantData.light}
          water={plantData.water}
          fullDescription={plantData.fullDescription}
        />
      </section>

      <section className="bg-white p-5 rounded-md">
        <h3 className="pb-4 font-semibold text-center text-lg">
          Quelques plantes de la catégorie "
          {firstLetterToCapitalize(plantData.category)}" :
        </h3>

        {plantsByCategory.length <= 0 ? (
          "Aucune plante"
        ) : (
          <div className="flex flex-wrap gap-5 justify-center">
            {plantsByCategory.slice(0, 5).map((plant) => (
              <div
                className="w-5/12 sm:w-4/12 md:w-3/12 lg:w-2/12 hover:opacity-75 transition-opacity flex flex-col"
                key={plant.id}
              >
                <a className="flex-1" href={`/plant/${plant.slug}`}>
                  <img src={plant.img} alt={plant.name} />
                </a>
                <a href={`/plant/${plant.slug}`}>
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