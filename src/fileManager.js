import fs from 'fs';

class FileManager {

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

    write = list => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    get = async () => {
        const d = await this.read()

        return d
    }

    getId =  list => {
        const count = list.length;
        return (count > 0) ? list[count-1].id + 1 : 1
    }
    

    add = async (obj) => {
        const list = await this.read()
        const idProduct = this.getId(list);
        obj.id = idProduct

        list.push(obj)

        await this.write(list)      
    }

    getById = async (id) => {
        const list = await this.read()
        const objByID = list.find(obj => obj.id === id)
        return objByID || console.log(`Error: el ID "${id}" no existe`);
    }

    update = async (id, obj) => {
        product.id = id
        const list = await this.read()

        for (let i=0; i < list; i++) {
            if(list[i].id == id){
                list[i] = obj
                break
            }    
        }

        await this.write(list)

    }

    updateByID = async (id, obj) =>{
        obj.id = id
        const list = await this.read()

        const idx = list.findIndex(e => e.id == id)
        if (idx < 0) return

        list [idx] = obj

        await this.write(list)
    }

    delete = async (id) => {
        const list = await this.read()
        const idDeleted = list.find(obj => obj.id === id)

        if(idDeleted){
            const index = list.indexOf(idDeleted)
            list.splice(index, 1);
            await this.write(list)
            console.log(`\n\n El Producto eliminado es: ID "${id}"`);
        } else {
            console.log(`\n\nNo se puede eliminar el producto: el ID "${id}" no existe`);
        }
    }

}

export default FileManager;