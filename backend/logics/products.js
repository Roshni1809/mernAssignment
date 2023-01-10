var { Product } = require("../schema/index")
var mongoose = require('mongoose')

var productLogic = {

    AddProducts: async (newProduct) => {
        // console.log(newProduct)
        return new Promise(async(resolve, reject) => {
            if (!newProduct || !newProduct.name || !newProduct.price || !newProduct.brand) {
                reject({status: 400, message: "Invalid Request!!"});
                return;
            }
            try {
                let data = new Product(newProduct)
                let result = await data.save();
                resolve(result);
                return;
            }
            catch {
                reject({ status: 502, message: "Internal Server Error"})
                return;
            }
        })


    },

    DeleteProducts: async (body) => {
        console.log(body)

        return new Promise( async(resolve,reject) => {
            if (!body.ids) {
                reject({status:404, message:"Invalid Argument"})
                return
            }
            try {
                let result = await Product.deleteMany({ _id: { $in: body.ids} })
                if (result) {
                    console.log(result)
                }
                const get = await Product.find({});
                resolve(get)
                // res.status(200).send(get)
                return
            }
            catch (err) {
                // console.log(err)
                reject({status:502, message:"Internal Server Error"})
                return
            }
        })
    },


    GetProducts: async () => {

        return new Promise(async (resolve, reject) => {

            try {
                let productList = await Product.find({})
                resolve(productList)
            }
            catch (err) {
                reject({ status: 502, message: "Internal Server Error" })
            }
        })
    }
}

module.exports = productLogic;


