const Products = require('../models/ProductModel')

const { getPostData }  =  require('../utils')

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
        const body = await getPostData(req)

        const {title, description, price} = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }
            
            const newProduct = await Products.create(product)

            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(newProduct))


    }catch(error){
        console.log(error);   
    };
    
}

//Update a Product
//@route PUT/api/products/:id

async function updateProduct(req, res, id) {
    try{
        const product = await Products.findById(id)
        
        if(!product){
            res.writeHead(400, {'content-type':'application/json'})
            res.end(JSON.stringify({message: 'product Not Found'}))
        } else {
            const body = await getPostData(req)

            const {title, description, price} = JSON.parse(body)

            const productData = {
                title: title|| product.title,
                description: description || product.description,
                price: price || product.price
            }
            
            const updProduct = await Products.update(id, productData)

            res.writeHead(200, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updProduct))

        }

        

    }catch(error){
        console.log(error);   
    };
    
}

//delete product by ID
//@route DELETE/api/products/:id

async function deleteProduct(req, res, id) {
    try{
        const product = await Products.findById(id) 

        if(!product){
            res.writeHead(400, {'content-type':'application/json'})
            res.end(JSON.stringify({message: 'product Not Found'}))
        } else{
            await Products.remove(id)

            res.writeHead(200, {'content-type':'application/json'})
            res.end(JSON.stringify({message: `product ${id} removed`}))
        }
        
    }catch(error){
        console.log(error);   
    };
    
}




module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}