const express = require('express')
const fs = require('fs')
const productsFile = "./products.json"
const productList = fs.readFileSync (productsFile, 'utf-8')
const productsParse = JSON.parse(productList)


const app = express()

app.get('/products', (req, res) =>{
    const limit = req.query.limit

    if(limit){ res.send(productsParse.slice(0,limit))}else{
        res.send(productsParse)
    }
}) 

app.get('/products/:pid', (req,res) =>{
    const productID = req.params.pid
    
    const productByID = productsParse.find(product => product.id == productID)

    if(!productByID) res.send(`<h2>Product not found.</h2>`)
    else res.send(productByID)

})


app.listen(8080, () => console.log('Server is running...'))