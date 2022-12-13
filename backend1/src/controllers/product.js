const {product} = require('../models')

exports.register = async (req, res, next) => {
    try {
        const {name, price, category_id} = req.body
         console.log(req.body)
    	
        let insertProduct = await product.create({ 			
            name: name, 			
            price: price, 					
            category_id: category_id 		
        })			

		return res.status(201).send({
            message: 'register success',
            data: insertProduct
		})

        
    } catch (error) {
        //console.log(error)
        return res.status(500).send({
            message: error.error,
            code: 500
        })
        
    }
}

//READ ALL. SEMUA DATA DITARIK
exports.readAll = async (req, res, next) => {
    try {
        const data = await product.findAll()

        return res.status(200).send({
            message: 'retrieve data success',
            data: data
            // token: token
        })

    } catch (error) {
    console.log(error)
    return res.status(500).send({

        message: error.error,
        code: 500
    })
}
  
}

//READ ONLY ID
exports.readme = async (req, res, next) => {
try {
    const id = req.params.id
    console.log(id)
    const data = await product.findOne({
        where: {id: id}
    })
if(!data){
    return res.status(404).send({
        message: 'data not found'
    })
}

return res.status(200).send({
    message: 'retrieve data success',
    data: data
})

} catch (error) {
    return res.status(500).send({
        message: error,
        code: 500
    })
}
    
}

//UPDATE
exports.update = async (req, res, next) => {
try {
    const id = req.params.id
    const {name, price, category_id} = req.body
    console.log(req.body)

    const updateData = await product.update({
        name: name,
        price: price,
        category_id: category_id
    }, {where: {id: id}})

  console.log(updateData)
  res.status(201).send({
    message: 'data updated',
    result: updateData
  })    
} catch (error) { 
    return res.status(500).send({
        message: error,
        code: 500
    })
}
}

//DELETE
exports.delete = async (req, res, next) => {
try {
    const id = req.params.id
    console.log(id)

    const dataProduct = await product.findOne({
        where: {id:id}
    })

    if(!dataProduct){
        return res.status(404).send({
            message: 'data not found, cannot delete data product',
            
        })
    }

    const deletedProduct = await product.destroy({
        where: {id: id} 
    })
  return res.status(200).send({
    message: 'data has been deleted',
    data: deletedProduct

  })
} catch (error) {
    return res.status(500).send({
        message: error,
        code: 500
    })     
}
}