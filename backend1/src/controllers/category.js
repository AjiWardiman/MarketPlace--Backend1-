const {category} = require('../models')

exports.register = async (req, res, next) => {
    try {
        const {name} = req.body
         console.log(req.body)
        
        let insertCategory = await category.create({ 			
            name: name			
        })			

		return res.status(201).send({
            message: 'register success',
            data: insertCategory
		})

        
    } catch (error) {
        return res.status(500).send({
            message: error.error,
            code: 500
        })
        
    }
}

//READ ALL. SEMUA DATA DITARIK
exports.readAll = async (req, res, next) => {
    try {
        const data = await category.findAll()

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
    const data = await category.findOne({
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
    const {name} = req.body
    console.log(req.body)

    const updateData = await category.update({
        name: name
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

    const dataCategory = await category.findOne({
        where: {id:id}
    })

    if(!dataCategory){
        return res.status(404).send({
            message: 'data not found, cannot delete data category',
            
        })
    }

    const deletedCategory = await category.destroy({
        where: {id: id} 
    })
  return res.status(200).send({
    message: 'data has been deleted',
    data: deletedCategory

  })
} catch (error) {
    return res.status(500).send({
        message: error,
        code: 500
    })     
}
}