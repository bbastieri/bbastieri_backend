import { Router } from 'express';
import FileManager from '../fileManager';


const fileManager = new FileManager('./products.json')

const router = Router();


router.get('/', async (req, res) => {
    const products = await fileManager.get()
    res.json({products})
})

router.post('/', async(req, res) =>{
    const products = req.body
    const productAdded = await fileManager.add(products)

    res.json({status: "success", productAdded})
})

export default router
