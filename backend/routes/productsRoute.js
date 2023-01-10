var express = require('express')
var productRouter = express.Router()
const { productLogic }=require('../logics/index')




productRouter.get("", async (req, res) => {
    try {
    let result = await productLogic.GetProducts();
    res.status(200).send(result)
    return;
    }
    catch (err) {
        res.status(err.status).send(err.message);
        return;
    }
})


productRouter.post("", async(req, res) => {
try{
    let result = await productLogic.AddProducts(req.body);
    res.status(200).send(result);
    return
 }
catch(err){
    res.status(err.status).send(err.message);
    return;
}
})

// productRouter.put("", (req, res) => {
// res.send("This is Product PUT Route")
// })

productRouter.delete("", async(req, res) => {
    console.log(req.body)

    try{
        let result = await productLogic.DeleteProducts(req.body);
        res.status(200).send(result);
        return
    }
    catch(err){
        res.status(err.status).send(err.message);
        return;
    }
})



module.exports = productRouter;