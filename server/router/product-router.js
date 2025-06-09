const express = require('express')
const router = express.Router()

const productController = require('../controller/product-controller')

const upload = require('../middleware/uploadMiddleware')
const fetchProductById = require('../controller/fetchProductById')
const { authorizesRoles } = require('../middleware/role.middleware')
const verifyToken = require('../middleware/jwt-verification')

const uplodFields = upload.fields([
    { name: 'images', maxCount: 10 },
])

router.route('/addProduct').post(verifyToken, authorizesRoles("admin"), uplodFields ,productController.addProduct)

router.route('/getProduct').post(verifyToken, authorizesRoles("admin"), productController.getProducts)

router.route('/deleteProduct/:id').delete(verifyToken, authorizesRoles("admin"), productController.deleteProduct)

router.route('/updateProduct/:id').put(verifyToken, authorizesRoles("admin"), upload.any("images") ,productController.updateProduct)

router.route('/getProductById/:id').get(fetchProductById)

router.route('/total-products').get(productController.totalProducts)

module.exports = router
