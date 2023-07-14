"use client"
import PlantDetail from "@/app/components/PlantDetail";
import { plantList } from "@/app/components/data/listPlant";
import NotFound from "./not-found";

export default function Page({ params }: { params: { id: string } }) {
    const plantId = params.id;
    const plantData = plantList.filter(plant => plant.id === plantId);

    if (plantData.length === 0) {
        return NotFound();
    }
    
    return (
    <main>
        <div className="container">
        <PlantDetail
            img={plantData[0].img}
            name={plantData[0].name}
            category={plantData[0].category}
            light={plantData[0].light}
            water={plantData[0].water}
            fullDescription={plantData[0].fullDescription}
        ></PlantDetail>
        </div>
    </main>
    );
}
