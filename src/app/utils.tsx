export const calculNbEmoji = (nb: number, emoji: string) => {
    const arr = [];
    for (let index = 0; index < nb; index++) {
        arr.push(emoji);
    }
    return arr;
}

export const firstLetterToCapitalize = (word: string) => {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1);
}

export const convertNumberToText = (value: number) => {
    switch (value) {
        case 1: return "Faible";
        case 2: return "Moyen";
        case 3: return "Fort";
        default: return "Valeur inconnue";
    }
}