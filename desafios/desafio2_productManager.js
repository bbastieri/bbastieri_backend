const fs = require('fs')

class ProductManager {

    constructor (path) {
        this.path = path
        this.format = 'utf-8'
    }

    getId =  async () =>{
        const d = await this.getProduct();
        const count = d.length;
        return count > 0 ? d[count-1].id + 1 : 1;
    }

    addProduct = async (title, description, price, thumbnail, code, stock, ) => {
        const id = await this.getId();
            return this.getProduct()
            .then(products => {
                products.push({
                    id: id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,    
                })
                return products;
            })
            .then(productsNew => fs.promises.writeFile(this.path, JSON.stringify(productsNew)))
        }
    

    getProductById = async (id) => {
        const data = await this.getProduct()
        const productFound = data.find(product => product.id === id)
        return productFound || console.log(`ERROR: EL PRODUCTO CON EL ID "${id}" NO EXISTE.`);
    }

    getProduct = async () => {
        const product = fs.promises.readFile(this.fileName, this.format)
        return product
            .then(content => JSON.parse(content))
            .catch(e => {if(e) return []})
    }

}    

async function run (){
const manager = new ProductManager('./products.json')
await manager.addProduct("Bombi Heavy Metal", "Bombi tiro alto combinada en red y cuero ecológico ", 1700, "No image", 1, 10)
await manager.addProduct("Corpi Heavy Metal", "Corpi tipo top combinado en red y cuero ecológico ", 2500, "No image", 2, 20)

console.log(await manager.product)
console.log(await manager.getProduct);
}

run()