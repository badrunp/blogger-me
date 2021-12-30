export function toCapitaliceFirst(text){

    return text.charAt(0).toUpperCase() + text.slice(1);

}

export function parseDate(time){
    return time.split("T")[0];
}