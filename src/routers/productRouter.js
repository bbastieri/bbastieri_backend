import { Router } from 'express';
import ProductManager from '.././productManager.js'


const productManager = new ProductManager('./products.json')

const router = Router();

router.get('/', async (req, res) => {
    let limit = req.query.limit;
    const products = await productManager.get()
    if(!limit){
        return res.json({products})
    }
    limit = limit < products.length ? limit : products.length;
    const array = [];
    for(let i=0; i<limit; i++){
        arr.push(products[i]);
    }
    return res.json({array});
})

router.get('/:pid', async (req, res)=>{
    const prodID = parseInt(req.params.pid);
    const product = await productManager.getById(prodID);
    if(product == -1) return res.status(404).send(`Product not found`);
    return res.json({product});
})

router.post('/', async(req, res) =>{
    const products = req.body
    const productAdded = await productManager.add(products)

    res.json({status: "success", productAdded})
})

router.put('/:pid', async (req, res) =>{
    const prodID = parseInt(req.params.pid);
    const updateProd = req.body;
    const product = await productManager.getById(prodID);
    
    if(product == -1) return res.status(404).send(`Product not found`);
    
    for(const prop in updateProd){
        product[prop] = updateProd[prop];
    }
    
    await productManager.update(prodID, product);

    res.send({status: 'update successful', product});
})

router.delete('/:pid', async (req, res)=>{
    const prodID = parseInt(req.params.pid);
    const newList = await productManager.delete(prodID);

    if(!newList) return res.status(404).send(`Product not found`);

    res.send({status: 'Update Successful', newList});
})

export default router;
