const mostrarLista = array => {
    console.log('____________');

    if (array.length == 0) return "Lista vacía"

    array.forEach(element =>{
        console.log(element);
    })

    return `La longitud del array es ${array.length}`
};

console.log(mostrarLista([1, 2, 3]));
console.log(mostrarLista([]));
console.log(mostrarLista(["R2", 'Maximo', 3]));

