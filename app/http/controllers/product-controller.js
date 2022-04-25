const Product = require('../../models/Product')

const productController = {

    // Create product
    // 
    async createProduct(req, res) {
        const newProduct = new Product(req.body);

        try {
          const savedProduct = await newProduct.save();
          res.status(200).json(savedProduct);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    
    // Update Product
    async updateProduct(req, res) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updatedProduct);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    // Delete Product

    async deleteProduct(req, res) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Product has been deleted...");
          } catch (err) {
            res.status(500).json(err);
          }
    },

    // Get Product
    async getProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    // Get all product
    async allProduct(req, res){
        const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
    }
}

module.exports = productController