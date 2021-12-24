export function toCapitaliceFirst(text){

    const textFirst = text.charAt(0).toUpperCase();
    const textMore = text.slice(1, text.length)

    return textFirst.concat(textMore);

}