const express = require('express')
const router = express.Router()

const productController = require('../controller/product-controller')

const upload = require('../middleware/uploadMiddleware')
const fetchProductById = require('../controller/fetchProductById')

const uplodFields = upload.fields([
    { name: 'images', maxCount: 10 },
])

router.route('/addProduct').post(uplodFields ,productController.addProduct)

router.route('/getProduct').post(productController.getProducts)

router.route('/deleteProduct/:id').delete(productController.deleteProduct)

router.route('/updateProduct/:id').put(upload.any("images") ,productController.updateProduct)

router.route('/getProductById/:id').get(fetchProductById)

module.exports = router
