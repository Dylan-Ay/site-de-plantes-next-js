'use client'
import { useState } from 'react'
import { plantList } from '@/components/data/listPlant'
import SeeMoreButton from '@/components/SeeMoreButton'
import PlantCard from '@/components/PlantCard'
import DropdownFilter from '@/components/DropdownFilter'
import ActiveFilter from '@/components/ActiveFilter'
import SelectSort from '@/components/SelectSort'

export default function Home() {
  const [plants, setPlants] = useState(plantList.sort((a, b) => (a.id < b.id) ? 1 : -1));
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
  const plantsLightNeed = createArrayOfFilterable(plantsCopied, 'light', 'Tous', true);

  // Créations des states pour les filtres actifs
  const [filterValue, setFilterValue] = useState<string | number | null>(null);
  const [filterTitle, setFilterTitle] = useState<string | null>(null);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [getKeyValue, setKeyValue] = useState<string>('');
  
  // Récupère du composant DropDownFilter la clé et la valeur à partir desquels appliquer le filtre
  const handleFilter = (value: string | number, keyValue: string) => {

      setFilterValue(value);
      setIsFilterActive(true);
      setKeyValue(keyValue);

    if (value === "Toutes" || value === "Tous") {
      setPlants(plantsCopied);
      setIsFilterActive(false);
    }else{
      switch (keyValue) {
        case 'water':
          setPlants(applyFilter(plantsCopied, keyValue, value));
          setFilterTitle('Arrosage');
          break;
  
        case 'category':
          setPlants(applyFilter(plantsCopied, keyValue, value));
          setFilterTitle('Catégories');
          break;

        case 'light':
          setPlants(applyFilter(plantsCopied, keyValue, value));
          setFilterTitle('Exposition');
          break;

        default:
          setPlants(plantsCopied);
          break;
      } 
    }
  }
  // Récupère du composant SelectSort la valeur au clique de la liste déroulante
  const handleSort = (value: string) => {
    if (value === "Popularité") {
      const plantsByPopularity = plantsCopied.sort((a, b) => (a.isBestSale < b.isBestSale) ? 1 : -1);
      setPlants(plantsByPopularity);
    }else if (value === "Nom") {
      const plantsByName = plantsCopied.sort((a, b) => (a.name > b.name) ? 1 : -1);
      setPlants(plantsByName);
    }else{
      setPlants(plantList.sort((a, b) => (a.id < b.id) ? 1 : -1));
    }
  }

  return (
    <main className='container mx-auto pb-9'>
        <h1 className="py-10 text-5xl text-center">Liste des Plantes</h1>

        <section className='bg-white rounded-md mb-12'>
          <div className='flex px-8 items-center gap-7 pt-5 pb-4'>
            <span>Trier par :</span>
            <SelectSort handleSort={handleSort}></SelectSort>
          </div>
          <div className='flex px-8 justify-start items-center pt-5 pb-4 gap-5'>
            <span>Filtrer par :</span>
            <DropdownFilter keyValue='category' filterTitle='Catégories' elementsList={plantsCategories} handleFilter={handleFilter}></DropdownFilter>
            <DropdownFilter keyValue='water' filterTitle='Arrosage' elementsList={plantsWaterNeed} handleFilter={handleFilter}></DropdownFilter>
            <DropdownFilter keyValue='light' filterTitle='Exposition' elementsList={plantsLightNeed} handleFilter={handleFilter}></DropdownFilter>
          </div>
          <div className='flex px-8 items-center gap-5 pb-4 h-16'>
            {isFilterActive && <ActiveFilter resetFilter={setIsFilterActive} resetPlantsList={resetPlantsList} filterValue={filterValue} filterTitle={filterTitle} getKeyValue={getKeyValue}  ></ActiveFilter>}
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