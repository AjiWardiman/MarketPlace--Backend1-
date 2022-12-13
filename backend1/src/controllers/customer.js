const bcrypt = require('bcrypt')
const {customer} = require('../models')

exports.register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body
         console.log(req.body)
        
        const hashedPassword = bcrypt.hashSync(password, 8) 		
        let insertCustomer = await customer.create({ 			
            name: name, 			
            email: email, 					
            password: hashedPassword 		
        })			

		return res.status(201).send({
            message: 'register success',
            data: insertCustomer
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
        const data = await customer.findAll()

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
    const data = await customer.findOne({
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
    const {name, email, password} = req.body
    console.log(req.body)

    const hashedPassword = bcrypt.hashSync(password, 8) 
    const updateData = await customer.update({
        name: name,
        email: email,
        password:hashedPassword
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

    const dataCustomer = await customer.findOne({
        where: {id:id}
    })

    if(!dataCustomer){
        return res.status(404).send({
            message: 'data not found, cannot delete data customer',
            
        })
    }

    const deletedCustomer = await customer.destroy({
        where: {id: id} 
    })
  return res.status(200).send({
    message: 'data has been deleted',
    data: deletedCustomer

  })
} catch (error) {
    return res.status(500).send({
        message: error,
        code: 500
    })     
}
}