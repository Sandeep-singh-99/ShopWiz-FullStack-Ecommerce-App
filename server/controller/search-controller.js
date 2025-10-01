const Product = require("../models/product-model");


const searchController = async (req, res) => {
    try {
        const { query, page = 1, limit = 10, minPrice, maxPrice, category } = req.query;

    const filter = {};

    if (query) {
      filter.$or = [
        { productName: { $regex: query, $options: "i" } },
        { productBrand: { $regex: query, $options: "i" } },
      ];
    }

    if (category) {
      filter.productCategory = category;
    }

    if (minPrice || maxPrice) {
      filter.salesPrice = {};
      if (minPrice) filter.salesPrice.$gte = parseFloat(minPrice);
      if (maxPrice) filter.salesPrice.$lte = parseFloat(maxPrice);
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: products,
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { searchController };