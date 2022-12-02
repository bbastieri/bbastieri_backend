const fs = require('fs')

class ProductManager {

    constructor (path) {
        this.path = path
    }

    read = async () =>{
        if (fs.existsSync(this.path)){
            return fs.promises.readFile(this.path,'utf-8')
                .then(result => JSON.parse(result))
        }
        return []
    } 

    write = productList => {
        return fs.promises.writeFile(this.path, JSON.stringify(productList))
    }

    getProducts = async () => {
        const d = await this.read()

        return d
    }

    getId =  productList =>{
        const count = productList.length;
        return (count > 0) ? productList[count-1].id + 1 : 1
    }
    

    addProduct = async (product) => {
        const productList = await this.read()
        const idProduct = this.getId(productList);
        product.id = idProduct

        productList.push(product)

        await this.write(productList)      
    }

    getProductById = async (id) => {
        const productList = await this.read()
        const productByID = productList.find(product => product.id === id)
        return productByID || console.log(`Error: el ID "${id}" no existe`);
    }

    updateProduct = async (id, product) => {
        product.id = id
        const productList = await this.read()

        for (let i=0; i < productList; i++) {
            if(productList[i].id == id){
                productList[i] = product
                break
            }    
        }

        await this.write(productList)

    }

    deleteProduct = async (id) => {
        const productList = await this.read()
        const idDeleted = productList.find(product => product.id === id)

        if(idDeleted){
            const index = productList.indexOf(idDeleted)
            productList.splice(index, 1);
            await this.write(productList)
            console.log(`\n\n El Producto eliminado es: ID "${id}"`);
        } else {
            console.log(`\n\nNo se puede eliminar el producto: el ID "${id}" no existe`);
        }
    }
    

}




async function run (){
const manager = new ProductManager('./products.json')
await manager.addProduct({title: "Bombi Heavy Metal", description:"Bombi tiro alto combinada en red y cuero ecológico ", price:1700, thumbnail:"No image", code:1, stock:10})

console.log(await manager.getProducts())

await manager.updateProduct(1, {title: "Bombi Heavy Metal", description:"Bombi tiro alto combinada en red y cuero ecológico ", price:1500, thumbnail:"No image", code:1, stock:15})



}

run()