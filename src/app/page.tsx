'use client'
import 'bootstrap/dist/css/bootstrap.css'
import styles from './page.module.css'
import { useState } from 'react'
import { plantList } from './components/data/listPlant'
import NavBar from './components/NavBar'
import Plant from './components/Plant'
import SeeMoreButton from './components/SeeMoreButton'

export default function Home() {
  const [plants, setPlant] = useState(plantList)
  
  return (
    <main>
      <NavBar></NavBar>
      <div className="container">
        <h1 className="py-3 text-center">Liste des plantes</h1>
        <div className="row g-3">
          {plants.map((plant) => (
            <Plant
              key={plant.id}
              img={`${plant.img}`}
              button={<SeeMoreButton color="success">Voir plante</SeeMoreButton>}
              category={plant.category}
              description={plant.description}
              name={plant.name}
              light={plant.light}
              water={plant.water}
            ></Plant>
          ))}
        </div>
      </div>
    </main>
  )
}
