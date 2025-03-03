const Products = require('../models/ProductModel')

//get ALL Products
//@route GET/api/products

async function getProducts(req, res) {
    try{
        const products = await Products.findAll() 

        res.writeHead(200, {'content-type':'application/json'})
        res.end(JSON.stringify(products))
    }catch(error){
        console.log(error);   
    };
    
}

//get product by ID
//@route GET/api/products/:id

async function getProduct(req, res, id) {
    try{
        const product = await Products.findById(id) 

        if(!product){
            res.writeHead(400, {'content-type':'application/json'})
            res.end(JSON.stringify({message: 'product Not Found'}))
        } else{
            res.writeHead(200, {'content-type':'application/json'})
            res.end(JSON.stringify(product))
        }
        
    }catch(error){
        console.log(error);   
    };
    
}

//Create a Product
//@route POST/api/products/

async function createProduct(req, res) {
    try{


        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', async() => {
            const{title,description,price} = JSON.parse(body)

            
        const product = {
            title,
            description,
            price
        }
            
            const newProduct = await Products.create(product)

            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(newProduct))

        })

        
    }catch(error){
        console.log(error);   
    };
    
}


module.exports = {
    getProducts,
    getProduct,
    createProduct
}