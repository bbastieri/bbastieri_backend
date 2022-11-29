const { log } = require('console');
const fs = require('fs')

class ProductManager {

    constructor (path) {
        this.path = path
        this.format = 'utf-8'
    }

    getId =  async () =>{
        const d = await this.getProducts();
        const count = d.length;
        return count > 0 ? d[count-1].id + 1 : 1;
    }

    addProduct = async (title, description, price, thumbnail, code, stock, ) => {
        const id = await this.getId();
            return this.getProducts()
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
        const d = await this.getProducts()
        const productByID = d.find(product => product.id === id)
        return productByID || console.log(`Error: el ID "${id}" no existe`);
    }

    getProducts = async () => {
        const product = fs.promises.readFile(this.path, this.format)
        return product
            .then(content => JSON.parse(content))
            .catch(e => {if(e) return []})
    }

    deleteProduct = async (id) => {
        const data = await this.getProducts()
        const idDeleted = data.find(product => product.id === id)

        if(idDeleted){
            const index = data.indexOf(idDeleted)
            data.splice(index, 1);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data))
            console.log(`\n\n El Producto eliminado es: ID "${id}"`);
        } else {
            console.log(`\n\nNo se puede eliminar el producto: el ID "${id}" no existe`);
        }
    }

    updateProduct = async (id) => {
        const data = await this.getProduct()
        const idUpdate = data.find(product => product.id === id)

        idUpdate["title"] = "Titulo Actualizado"
        idUpdate["stock"] = 30
        
        fs.writeFileSync(this.fileName, JSON.stringify(data))
    }

}




async function run (){
const manager = new ProductManager('./products.json')
await manager.addProduct("Bombi Heavy Metal", "Bombi tiro alto combinada en red y cuero ecológico ", 1700, "No image", 1, 10)
await manager.addProduct("Corpi Heavy Metal", "Corpi tipo top combinado en red y cuero ecológico ", 2500, "No image", 2, 20)
await manager.deleteProduct(2);
await manager.updateProduct(4)

    console.log("________________________\n");
    console.log(await manager.getProduct());
    console.log("______________________________");
    console.log(await manager.getProductById(3));
    console.log("_________________________")
    console.log(await manager.getProductById(50));
}

run()