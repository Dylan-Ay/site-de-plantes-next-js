'use client'
import { useState } from 'react'
import { plantList } from '@/components/data/listPlant'
import SeeMoreButton from '@/components/SeeMoreButton'
import PlantCard from '@/components/PlantCard'
import DropdownFilter from '@/components/DropdownFilter'
import ActiveFilter from '@/components/ActiveFilter'

export default function Home() {
  const [plants, setPlants] = useState(plantList);
  const resetPlantsList = () => {
    setPlants(plantList);
  }
  
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
  const applyFilter = (elementsArray: Array<any>, keyValue: string, filteredKeyValue : string | number) => {
    const filteredPlants = elementsArray.filter((plant) => plant[keyValue] === filteredKeyValue) 

    return filteredPlants;
  }

  // Création des tableaux filtrés
  const plantsCategories = createArrayOfFilterable(plantsCopied, 'category', 'Toutes');
  const plantsWaterNeed = createArrayOfFilterable(plantsCopied, 'water', 'Tous', true);
  const plantsSunNeed = createArrayOfFilterable(plantsCopied, 'light', 'Tous', true);

  // Créations des states pour les filtres actifs
  const [filterValue, setFilterValue] = useState<string | number | null>(null);
  const [filterTitle, setFilterTitle] = useState<string | null>(null);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  
  // Element d'écoute sur le titre
  const handleFilter = (value: string | number, keyValue: string) => {
    
    setFilterValue(value);
    setIsFilterActive(true);

    if (value === "Toutes" || value === "Tous") {
      setPlants(plantsCopied);
    }else{
      switch (keyValue) {
        case 'water':
          setPlants(applyFilter(plantsCopied, 'water', value));
          setFilterTitle('Besoin en Eau');
          break;
  
        case 'category':
          setPlants(applyFilter(plantsCopied, 'category', value));
          setFilterTitle('Catégories');
          break;

        case 'light':
          setPlants(applyFilter(plantsCopied, 'light', value));
          setFilterTitle('Besoin en Soleil');
          break;

        default:
          setPlants(plantsCopied);
          break;
      } 
    }
  }

  return (
    <main className='container mx-auto pb-9'>
        <h1 className="py-10 text-5xl text-center">Liste des Plantes</h1>

        <section className='bg-white rounded-md'>
          <div className='flex px-8 justify-start items-center py-5 gap-5'>
            <span>Filtrer par :</span>
            <DropdownFilter keyValue='category' filterTitle='Catégories' elementsList={plantsCategories} handleFilter={handleFilter}></DropdownFilter>
            <DropdownFilter keyValue='water' filterTitle='Besoin en Eau' elementsList={plantsWaterNeed} handleFilter={handleFilter}></DropdownFilter>
            <DropdownFilter keyValue='light' filterTitle='Besoin en Soleil' elementsList={plantsWaterNeed} handleFilter={handleFilter}></DropdownFilter>
          </div>
          <div className='flex px-8 mb-12 items-center gap-5 pb-5'>
            <span>Filtres actifs :</span>
            {isFilterActive && <ActiveFilter resetFilter={setIsFilterActive} resetPlantsList={resetPlantsList} filterValue={filterValue} filterTitle={filterTitle} ></ActiveFilter>}
          </div>
        </section>

        <section className="flex flex-wrap justify-center gap-10">
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
        </section>
    </main>
  )
}