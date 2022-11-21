class ProductManager {

    constructor(){
        this.products = []
    }

    getId = () => {
        const count = this.products.length;
        return (count>0) ? this.products[count-1].id + 1 : 1; 
    }

    addProducts = (title, description, price, thumbnail, code, stock ) => {

        const product = {
            id: this.getId(),
            title,
            description,
            price,
            thumbnail,
            code, 
            stock
        }

        const verifyCode = this.products.some (product => product.code === code)

        if(!verifyCode) {
            this.products.push (product)
        }

    }

    getProducts = () => {return this.products}

    getProductbyId = (id) => {
        return this.products.find((prod) => prod.id == id) ?? "Not Found";
    }

}

const manager = new ProductManager

manager.addProducts("Bombi Heavy Metal", "Bombi tiro alto combinada en red y cuero ecológico ", 1700, "No image", 1, 10)
manager.addProducts("Corpi Heavy Metal", "Corpi tipo top combinado en red y cuero ecológico ", 2500, "No image", 2, 20)

console.log(manager.products);
console.log(manager.getProductbyId(5))