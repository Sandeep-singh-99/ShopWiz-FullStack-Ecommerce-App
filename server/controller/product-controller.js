const imagekitConfig = require("../config/imagekit");
const Product = require("../models/product-model");
const NodeCache = require("node-cache");

const nodeCache = new NodeCache();

const addProduct = async (req, res) => {
  try {

    const {
      productName,
      productBrand,
      productPrice,
      salesPrice,
      productDescription,
      productCategory,
    } = req.body;

    const images = []
    const imageKitProductIds = []

    if (req.files && req.files['images']) {
      const imageFiles = req.files['images'];
      
      for (const file of imageFiles) {
          // if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
          //     return res.status(400).json({ error: "Only JPEG and PNG allowed for images" });
          // }
          
          const uploadResponse = await imagekitConfig.upload({
              file: file.buffer,
              fileName: file.originalname,
              folder: '/e-commerce-app/products'
          });
          
          images.push(uploadResponse.url);
          imageKitProductIds.push(uploadResponse.fileId);
      }
  }
  
    const newProduct = await Product.create({
      productName,
      productBrand,
      productPrice,
      salesPrice,
      productDescription,
      productCategory,
      productImage: images, 
      imageKitProductId: imageKitProductIds,
    });

    nodeCache.del("getProducts");

    res.status(201).json({
      message: "Product added successfully",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    let getProducts;

    if(nodeCache.has("getProducts")) {
      getProducts = JSON.parse(nodeCache.get("getProducts"));
    } else {
      getProducts = await Product.find();
      nodeCache.set("getProducts", JSON.stringify(getProducts));
    }

    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      data: getProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

 
    if (product.imageKitProductId && product.imageKitProductId.length > 0) {
      try {
        await Promise.all(
          product.imageKitProductId.map((fileId) =>
            imagekitConfig.deleteFile(fileId)
          )
        );
      } catch (error) {
        console.error("Error deleting images from ImageKit:", error);
      }
    }

    // Clear cache
    nodeCache.del("getProducts");

    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      data: product, 
    });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    // Fetch the existing product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const { productName, productPrice, salesPrice, productDescription, productBrand, productCategory } = req.body;

    // Prepare update fields with existing values as defaults
    const updateFields = {
      productName: productName || product.productName,
      productPrice: productPrice || product.productPrice,
      salesPrice: salesPrice || product.salesPrice,
      productDescription: productDescription || product.productDescription,
      productBrand: productBrand || product.productBrand,
      productCategory: productCategory || product.productCategory,
      productImage: product.productImage || [], 
      imageKitProductId: product.imageKitProductId || [], 
    };

    // Handle image update if a new file is uploaded
    if (req.file) {
      // if (!['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
      //   return res.status(400).json({
      //     message: "Only JPEG and PNG images are allowed",
      //     success: false,
      //   });
      // }

      // Delete old images from ImageKit if they exist
      if (product.imageKitProductId && product.imageKitProductId.length > 0) {
        try {
          await Promise.all(
            product.imageKitProductId.map((fileId) =>
              imagekitConfig.deleteFile(fileId)
            )
          );
        } catch (error) {
          console.error("Error deleting old images from ImageKit:", error);
        }
      }

      // Upload new image
      const uploadResponse = await imagekitConfig.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/e-commerce-app/products',
      });

      // Replace the image arrays with the new single image
      updateFields.productImage = [uploadResponse.url];
      updateFields.imageKitProductId = [uploadResponse.fileId];
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true }
    );

    // Clear cache
    nodeCache.del("getProducts");

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};




module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
