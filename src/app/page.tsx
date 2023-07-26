'use client'
import { useState } from 'react'
import { plantList } from '@/components/data/listPlant'
import SeeMoreButton from '@/components/SeeMoreButton'
import PlantCard from '@/components/PlantCard'

export default function Home() {
  const [plants, setPlants] = useState(plantList);
  
  // Copie du tableau de plantes
  const plantsCopied = [...plantList];

  // Obtient une liste unique de toutes les catégories de plantes
  const plantsCategories = Array.from(new Set(plantsCopied.map((plant) => plant.category)));  

  // Ajout de la catégorie "Toutes" à la liste
  plantsCategories.unshift('Toutes');
    
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;

    if (category === "Toutes") {
      setPlants(plantsCopied);
    } else {
      // Garde les plantes dont la catégorie est celle choisie
      const filteredPlants = plantsCopied.filter((plant) => plant.category === category);
      setPlants(filteredPlants);
    }
  }

  return (
    <main>
      <div className="container mx-auto pb-9">
        <h1 className="py-10 text-5xl text-center">Liste des Plantes</h1>
        <div>
          {plantsCategories.map((category) => 
            <>
              <label key={category} htmlFor="filter">{category}</label>
              <input type="radio" name="filter" value={category} onChange={handleFilter} />
            </>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              img={`${plant.img}`}
              link={<SeeMoreButton href={`/plant/${plant.slug}`}>Voir plante</SeeMoreButton>}
              category={plant.category}
              slug={plant.slug}
              description={plant.description}
              name={plant.name}
              light={plant.light}
              water={plant.water}
            ></PlantCard>
          ))}
        </div>
      </div>
    </main>
  )
}