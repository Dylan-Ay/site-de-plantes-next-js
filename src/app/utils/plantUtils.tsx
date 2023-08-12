// Permet de  créer un tableau de filtres à partir d'une propriété d'un tableau de plantes
export const createArrayOfFilterable = (elementsArray: Array<any>, keyValue: string, elementToUnshift: string, sort : boolean = false ) => {
    const plantsElements = Array.from(new Set(elementsArray.map((plant) => plant[keyValue])));

    plantsElements.unshift(elementToUnshift);
    if (sort) {
        plantsElements.sort((a,b) => b - a)
    }

    return plantsElements
}

// Permet de vérifier si un tri est actif et d'appliquer le tri à un tableau de plantes
export const getSortedPlants = (elementsArray: Array<any>, sortBy: string): Array<any> => {
    switch (sortBy) {
      case "Nom":
        return elementsArray.sort((a, b) => a.name > b.name ? 1 : -1);
      case "Popularité":
        return elementsArray.sort((a, b) => a.isBestSale < b.isBestSale ? 1 : -1);
      case "Récent":
        return elementsArray.sort((a, b) => a.id < b.id ? 1 : -1);
      default:
        return elementsArray;
    }
}

// Permet d'appliquer un filtre sur une liste de plantes par une certaine propriété
export const applyFilter = (elementsArray: Array<any>, keyValue: string, filteredKeyValue : string | number, activeSort: string) => {
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
