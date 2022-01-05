const data = [
    {id: 1, name: 'badrun'},
    {id: 1, name: 'putri'},
    {id: 2, name: 'dodi'},
    {id: 3, name: 'dodi'},
]

const newArray = [...new Map(data.map(item => [item.id, item])).values()].filter(item => item.id != 3)
console.log(newArray);