'use client'
import { useState, useEffect } from 'react'
import { plantList } from '@/components/data/listPlant'
import SeeMoreButton from '@/components/SeeMoreButton'
import PlantCard from '@/components/PlantCard'
import DropdownFilter from '@/components/DropdownFilter'
import ActiveFilter from '@/components/ActiveFilter'
import SelectSort from '@/components/SelectSort'
import FilterAndSortButton from '@/components/FilterAndSortButton'
import { Plant } from './types/plantTypes'
import { createArrayOfFilterable, getSortedPlants, applyFilter } from './utils/plantUtils';

export default function Home() {
  const [plants, setPlants] = useState(plantList.sort((a, b) => (a.id < b.id) ? 1 : -1));
  const plantsCopied = [...plantList];
  const resetPlantsList = () => {
    const sortedPlants = getSortedPlants([...plantsCopied], activeSort)
    setPlants(sortedPlants);
    setFilteredPlants(plantsCopied);
  }
  const [resultNumber, setResultNumber] = useState(plantList.length);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

  // Met à jour le nombre de résultats à chaque fois que la liste de plantes change.
  useEffect(() => {
    setResultNumber(plants.length);
  }, [plants]);
  
  const plantsCategories = createArrayOfFilterable(plantsCopied, 'category', 'Toutes');
  const plantsWaterNeed = createArrayOfFilterable(plantsCopied, 'water', 'Tous', true);
  const plantsLightNeed = createArrayOfFilterable(plantsCopied, 'light', 'Tous', true);

  const [filterValue, setFilterValue] = useState<string | number | null>(null);
  const [filterTitle, setFilterTitle] = useState<string | null>(null);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [getKeyValue, setKeyValue] = useState<string>('');
  const [activeSort, setActiveSort] = useState<string>('Récent');
  
  // Récupère du composant DropDownFilter la clé et la valeur à partir desquels appliquer le filtre
  const handleFilter = (value: string | number, keyValue: string) => {
    setFilterValue(value);
    setIsFilterActive(true);
    setKeyValue(keyValue);
  
    let newPlants: typeof plantsCopied;
  
    if (value === "Toutes" || value === "Tous") {
      newPlants = getSortedPlants(plantsCopied, activeSort);
      setIsFilterActive(false);
    } else {
      const filterTitles: { [key: string]: string } = {
        water: 'Arrosage',
        category: 'Catégories',
        light: 'Exposition'
      };
  
      newPlants = applyFilter([...plantsCopied], keyValue, value, activeSort);
  
      if (filterTitles[keyValue]) {
        setFilterTitle(filterTitles[keyValue]);
      }
    }
  
    setPlants(newPlants);
    setFilteredPlants(newPlants);
  };
  
  // Récupère du composant SelectSort la valeur au clique de la liste déroulante de tri
  const handleSort = (value: string) => {
    // Si un filtre a été appliqué
    if ([...filteredPlants].length > 0) {
      const sortedPlants = getSortedPlants([...filteredPlants], value);
      setPlants(sortedPlants);
    } else {
      const sortedPlants = getSortedPlants(plantsCopied, value);
      setPlants(sortedPlants);
    }
    setActiveSort(value);
  };
  // Gère l'affichage du menu de tri/filtre
  const [filterSortMenuOpen, setFilterSortMenuOpen] = useState(false);
  
  return (
    <main className='container mx-auto pb-9'>
        <h1 className="py-10 text-5xl text-center">Liste des Plantes</h1>
        <section className='bg-white md:bg-white rounded-md mb-12 px-8 mx-auto max-w-fit md:max-w-[1041px]'>
          {<FilterAndSortButton setFilterSortMenuOpen={setFilterSortMenuOpen} resultNumber={resultNumber} filterSortMenuOpen={filterSortMenuOpen}/>}
          <div className={filterSortMenuOpen ? 'block bg-white rounded-md' : 'hidden md:block'}>
            <div className='flex items-center gap-7 pt-4 pb-2'>
              <span>Trier par :</span>
              <SelectSort handleSort={handleSort}></SelectSort>
            </div>
            <div className='flex justify-start sm:items-center flex-col sm:flex-row py-3 gap-5'>
              <span>Filtrer par :</span>
              <DropdownFilter keyValue='category' filterTitle='Catégories' elementsList={plantsCategories} handleFilter={handleFilter}></DropdownFilter>
              <DropdownFilter keyValue='water' filterTitle='Arrosage' elementsList={plantsWaterNeed} handleFilter={handleFilter}></DropdownFilter>
              <DropdownFilter keyValue='light' filterTitle='Exposition' elementsList={plantsLightNeed} handleFilter={handleFilter}></DropdownFilter>
            </div>
            <div className={filterSortMenuOpen ? 'flex items-center gap-5 pb-4 justify-between' : 'flex items-center gap-5 pb-4 justify-between'}>
              {isFilterActive && <ActiveFilter resetFilter={setIsFilterActive} resetPlantsList={resetPlantsList} filterValue={filterValue} filterTitle={filterTitle} getKeyValue={getKeyValue}  ></ActiveFilter>}
              <div className='justify-self-end hidden md:block'>
                Nombre de résultats : {resultNumber}
              </div>
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