const { Router } = require('express');
const axios = require('axios')
const {Report} = require('../db')

const router = Router()

router.post('/', async(req, res) =>{
    const {data}= req.body
    console.log(data);
    const payData = await axios.get(`https://api.mercadopago.com/v1/payments/${data.id}/?access_token=TEST-8344826949636961-021621-fa6f50dd49774c61c2de981dba9fbeae-157434994`)

    try {
        if(payData.data.status_detail === "accredited"){
            const reporte = await Report.create({
                name: payData.data.status,
                idpago: payData.data.status_detail
            })
            res.status(200).send(reporte)
        }
    } catch (error) {
        res.status(404).send(error)
    }
  
    
})



module.exports= router