'use client'
import { useState } from 'react'
import { plantList } from '@/components/data/listPlant'
import SeeMoreButton from '@/components/SeeMoreButton'
import PlantCard from '@/components/PlantCard'
import DropdownFilter from '@/components/DropdownFilter'

export default function Home() {
  const [plants, setPlants] = useState(plantList);
  
  // Copie du tableau de plantes
  const plantsCopied = [...plantList];

  // Permet de récupérer un tableau filtré par une certaine propriété
  const createArrayOfFilterable = (elementsArray: Array<any>, keyValue: string, elementToUnshift: string, sort : boolean = false ) => {
    const plantsElements = Array.from(new Set(elementsArray.map((plant) => plant[keyValue])));

    plantsElements.unshift(elementToUnshift);
    if (sort) {
      plantsElements.sort((a,b) => b - a)
    }

    return plantsElements
  }

  // Permet d'appliquer le filtre sur la liste de plantes par une certaine propriété
  const applyFilter = (elementsArray: Array<any>, keyValue: string | number, filteredKeyValue : string | number) => {
    const filteredPlants = elementsArray.filter((plant) => plant[keyValue] === filteredKeyValue) 

    return filteredPlants;
  }
  // Création des tableaux filtrés
  const plantsCategories = createArrayOfFilterable(plantsCopied, 'category', 'Toutes');
  const plantsWaterNeed = createArrayOfFilterable(plantsCopied, 'water', 'Tous', true);
  
  // Element d'écoute sur le fitre
  const handleFilter = (value: string | number, keyValue: string) => {

    if (value === "Toutes" || value === "Tous") {
      setPlants(plantsCopied);
    }else{
      switch (keyValue) {
        case 'water':
          setPlants(applyFilter(plantsCopied, 'water', value));
          break;
  
        case 'category':
          setPlants(applyFilter(plantsCopied, 'category', value));
          break;

        default:
          setPlants(plantsCopied);
          break;
      } 
    }
  }

  return (
    <main>
      <div className="container mx-auto pb-9">
        <h1 className="py-10 text-5xl text-center">Liste des Plantes</h1>
        <div className='flex px-8 justify-start mb-12 items-center gap-5'>
          <span>Filtrer par :</span>
          <DropdownFilter keyValue='category' filterTitle='Catégories' elementsList={plantsCategories} handleFilter={handleFilter}></DropdownFilter>
          <DropdownFilter keyValue='water' filterTitle='Besoin en eau' elementsList={plantsWaterNeed} handleFilter={handleFilter}></DropdownFilter>
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