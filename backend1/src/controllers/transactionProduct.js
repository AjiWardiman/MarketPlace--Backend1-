const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const {transactionProduct} = require('../models')

exports.register = async (req, res, next) => {
    try {
        const {transactions_id, product_id} = req.body
         console.log(req.body)

        let insertTransactionProduct = await transactionProduct.create({ 			
            transactions_id: transactions_id, 			
            product_id: product_id		
        })			

		return res.status(201).send({
            message: 'register success',
            data: insertTransactionProduct
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
        const data = await transactionProduct.findAll()

        return res.status(200).send({
            message: 'retrieve data success',
            data: data
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
    const data = await transactionProduct.findOne({
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
    const {transactions_id, product_id} = req.body
    console.log(req.body)

    const updateData = await transactionProduct.update({
        transactions_id: transactions_id,
        product_id: product_id
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

    const dataTransactionProduct = await transactionProduct.findOne({
        where: {id:id}
    })

    if(!dataTransactionProduct){
        return res.status(404).send({
            message: 'data not found, cannot delete data transaction Product',
            
        })
    }

    const deletedTransactionProduct = await transactionProduct.destroy({
        where: {id: id} 
    })
  return res.status(200).send({
    message: 'data has been deleted',
    data: deletedTransactionProduct

  })
} catch (error) {
    return res.status(500).send({
        message: error,
        code: 500
    })     
}
}