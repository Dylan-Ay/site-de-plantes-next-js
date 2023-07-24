'use client'
import { useState } from 'react'
import { plantList } from '@/components/data/listPlant'
import SeeMoreButton from '@/components/SeeMoreButton'
import PlantCard from '@/components/PlantCard'

export default function Home() {
  const [plants, setPlant] = useState(plantList)
  
  return (
    <main>
      <div className="container">
        <h1 className="py-3 text-center">Liste des Plantes</h1>
        <div className="row g-3">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              img={`${plant.img}`}
              link={<SeeMoreButton href={`/plant/${plant.slug}`} color="success">Voir plante</SeeMoreButton>}
              category={plant.category}
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