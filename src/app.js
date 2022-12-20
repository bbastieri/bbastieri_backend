import express from 'express';
import productRouter from './routers/productRouter.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static('public'))
app.use('/api/products', productRouter)

app.use('/', (req, res) => res.send('HOME'))



const server = app.listen(8080, () => console.log('Server is running...'))
server.on('error', () => console.log('ERROR'))