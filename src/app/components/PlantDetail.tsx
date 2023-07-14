interface Props {
    img: string;
    name: string;
    category: string;
    light: number;
    water: number;
    fullDescription: string;
  }

function PlantDetail({img, name, category, light, water, fullDescription}: Props) {
  return (
    <section>
        <h1 className="py-3 text-center">{name}</h1>
        <img className="img-fluid" src={img} alt={"photo d'une plante " + name} />
        

        <h3 className="pt-4">Description :</h3>
        <p>{fullDescription}</p>
    </section>
  )
}

export default PlantDetail