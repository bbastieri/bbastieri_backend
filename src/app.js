import express from 'express';
import productRouter from './routers/productRouter'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/static', express.static('public'))

app.use('/', (req, res) => res.send('HOME'))
app.use('/api/products', productRouter)


app.listen(8080, () => console.log('Server is running...'))