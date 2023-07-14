export const calculNbEmoji = (nb: number, emoji: string) => {
    const arr = [];
    for (let index = 0; index < nb; index++) {
        arr.push(emoji);
    }
    return arr;
}