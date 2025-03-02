const { log } = require('console')
const http = require('http')
const { getProducts, getProduct, createProduct } = require('./controllers/ProductController')
const { create } = require('domain')


const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET'){
        getProducts(req,  res)
    } else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if(req.url === '/api/products' && req.method === 'POST'){
        createProduct(req, res)
    } else{
        res.writeHead(404, {'content-type':'application/json'})
        res.end(JSON.stringify({message :'Route Not Found'}))
    }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))