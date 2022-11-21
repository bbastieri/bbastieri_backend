class Persona {

    constructor(nombre){
        console.log("Se ha creado una persona");

        this.name = nombre
        this.age = 30
    }

    static especie = "humano"

    speak () {
        console.log("My name is ", this.name, Persona.especie);
    }
    walk = () => {
        console.log("Moonwalk");
    }    

}

const agustin = new Persona ("Agustín")
const imanol = new Persona ("Imanol")
const lucas = new Persona ("Lucas")

console.log(agustin);
console.log(imanol);

imanol.age = 35
Persona.especie = "Homo Sapiens"

console.log(Persona.especie);

agustin.speak()
imanol. speak()
lucas.speak()