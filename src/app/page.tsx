'use client'
import { useState, useEffect } from 'react'
import { plantList } from '@/components/data/listPlant'
import SeeMoreButton from '@/components/SeeMoreButton'
import PlantCard from '@/components/PlantCard'
import DropdownFilter from '@/components/DropdownFilter'
import ActiveFilter from '@/components/ActiveFilter'
import SelectSort from '@/components/SelectSort'

export default function Home() {
  type Plant = {
    name: string;
    slug: string;
    category: string;
    id: number;
    isBestSale: boolean;
    light: number;
    water: number;
    img: string;
    description: string;
    fullDescription: string;
  };

  const [plants, setPlants] = useState(plantList.sort((a, b) => (a.id < b.id) ? 1 : -1));
  const plantsCopied = [...plantList];
  const resetPlantsList = () => {
    if (activeSort === "Nom") {
      setPlants(plantsCopied.sort((a, b) => a.name > b.name ? 1 : -1));
    }else if (activeSort === "Popularité"){
      setPlants(plantsCopied.sort((a, b) => a.isBestSale < b.isBestSale ? 1 : -1));
    }else{
      setPlants(plantsCopied);
    }
    setFilteredPlants(plantsCopied);
  }
  const [resultNumber, setResultNumber] = useState(plantList.length);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

  // Met à jour le nombre de résultats à chaque fois que plants change.
  useEffect(() => {
    setResultNumber(plants.length);
  }, [plants]);
  
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
    switch (activeSort) {
      case "Nom":
        let filteredArrayName = elementsArray.filter((plant) => plant[keyValue] === filteredKeyValue);
        return filteredArrayName = filteredArrayName.sort((a, b) => a.name > b.name ? 1 : -1);
      case "Popularité":
        let filteredArrayPopularity = elementsArray.filter((plant) => plant[keyValue] === filteredKeyValue);
        return filteredArrayPopularity = filteredArrayPopularity.sort((a, b) => a.isBestSale < b.isBestSale ? 1 : -1);
      case "Récent":
        let filteredArrayRecent = elementsArray.filter((plant) => plant[keyValue] === filteredKeyValue);
        return filteredArrayRecent = filteredArrayRecent.sort((a, b) => a.id < b.id ? 1 : -1);
      default:
        const filteredPlants = elementsArray.filter((plant) => plant[keyValue] === filteredKeyValue) 
        return filteredPlants;
    }
  }

  // Création des tableaux filtrés
  const plantsCategories = createArrayOfFilterable(plantsCopied, 'category', 'Toutes');
  const plantsWaterNeed = createArrayOfFilterable(plantsCopied, 'water', 'Tous', true);
  const plantsLightNeed = createArrayOfFilterable(plantsCopied, 'light', 'Tous', true);

  // Créations des useState
  const [filterValue, setFilterValue] = useState<string | number | null>(null);
  const [filterTitle, setFilterTitle] = useState<string | null>(null);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [getKeyValue, setKeyValue] = useState<string>('');
  const [activeSort, setActiveSort] = useState<string>('');
  
  // Récupère du composant DropDownFilter la clé et la valeur à partir desquels appliquer le filtre
  const handleFilter = (value: string | number, keyValue: string) => {

      setFilterValue(value);
      setIsFilterActive(true);
      setKeyValue(keyValue);

    if (value === "Toutes" || value === "Tous") {
      setPlants(plantsCopied);
      setFilteredPlants(plantsCopied);
      setIsFilterActive(false);
    }else{
      switch (keyValue) {
        case 'water':
          const waterFiltered = applyFilter([...plantsCopied], keyValue, value);
          setPlants(waterFiltered);
          setFilteredPlants(waterFiltered);
          setFilterTitle('Arrosage');
          break;
  
        case 'category':
          const categoryFiltered = applyFilter([...plantsCopied], keyValue, value);
          setPlants(categoryFiltered);
          setFilteredPlants(categoryFiltered);
          setFilterTitle('Catégories');
          break;

        case 'light':
          const lightFiltered = applyFilter([...plantsCopied], keyValue, value);
          setPlants(lightFiltered);
          setFilteredPlants(lightFiltered);
          setFilterTitle('Exposition');
          break;

        default:
          setPlants(plantsCopied);
          setFilteredPlants(plantsCopied);
          break;
      } 
    }
  }
  // Récupère du composant SelectSort la valeur au clique de la liste déroulante
  const handleSort = (value: string) => {
    if ([...filteredPlants].length > 0) {
      switch (value) {
        case "Popularité":
          const plantsByPopularity = [...filteredPlants].sort((a, b) =>
            a.isBestSale < b.isBestSale ? 1 : -1
          );
          setPlants(plantsByPopularity);
          console.log(value + "filtered")
          break;
        case "Nom":
          const plantsByName = [...filteredPlants].sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          setPlants(plantsByName);
          break;
        default:
          setPlants([...filteredPlants].sort((a, b) => (a.id < b.id ? 1 : -1)));
          break;
      }
    } else {
      switch (value) {
        case "Popularité":
          const plantsByPopularity = plantsCopied.sort((a, b) =>
            a.isBestSale < b.isBestSale ? 1 : -1
          );
          console.log(value)
          setPlants(plantsByPopularity);
          break;
        case "Nom":
          const plantsByName = plantsCopied.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          setPlants(plantsByName);
          break;
        default:
          setPlants(plantsCopied.sort((a, b) => (a.id < b.id ? 1 : -1)));
          break;
      }
    }
    setActiveSort(value);
    
  };

  return (
    <main className='container mx-auto pb-9'>
        <h1 className="py-10 text-5xl text-center">Liste des Plantes</h1>

        <section className='bg-white rounded-md mb-12 px-8 mx-auto max-w-[1041px]'>
          <div className='flex items-center gap-7 pt-4'>
            <span>Trier par :</span>
            <SelectSort handleSort={handleSort}></SelectSort>
          </div>
          <div className='flex justify-start sm:items-center flex-col sm:flex-row py-3 gap-5'>
            <span>Filtrer par :</span>
            <DropdownFilter keyValue='category' filterTitle='Catégories' elementsList={plantsCategories} handleFilter={handleFilter}></DropdownFilter>
            <DropdownFilter keyValue='water' filterTitle='Arrosage' elementsList={plantsWaterNeed} handleFilter={handleFilter}></DropdownFilter>
            <DropdownFilter keyValue='light' filterTitle='Exposition' elementsList={plantsLightNeed} handleFilter={handleFilter}></DropdownFilter>
          </div>
          <div className='flex items-center gap-5 pb-4 h-16 justify-between'>
            {isFilterActive && <ActiveFilter resetFilter={setIsFilterActive} resetPlantsList={resetPlantsList} filterValue={filterValue} filterTitle={filterTitle} getKeyValue={getKeyValue}  ></ActiveFilter>}
            <div className='justify-self-end'>
              Nombre de résultats : {resultNumber}
            </div>
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