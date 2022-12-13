const {transactions} = require('../models')

exports.register = async (req, res, next) => {
    try {
        const {total_price, customer_id} = req.body
         console.log(req.body)
        	
        let insertTransactions = await transactions.create({ 			
            total_price: total_price, 			
            customer_id: customer_id, 				
        })			

		return res.status(201).send({
            message: 'register success',
            data: insertTransactions
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
        const data = await transactions.findAll()

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
    const data = await transactions.findOne({
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
    const {total_price, customer_id} = req.body
    console.log(req.body)

    const updateData = await transactions.update({
        total_price: total_price,
        customer_id: customer_id
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

    const dataTransactions = await transactions.findOne({
        where: {id:id}
    })

    if(!dataTransactions){
        return res.status(404).send({
            message: 'data not found, cannot delete data transactions',
            
        })
    }

    const deletedTransactions = await transactions.destroy({
        where: {id: id} 
    })
  return res.status(200).send({
    message: 'data has been deleted',
    data: deletedTransactions

  })
} catch (error) {
    return res.status(500).send({
        message: error,
        code: 500
    })     
}
}