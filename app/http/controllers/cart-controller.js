const Cart = require('../../models/Cart')

const cartController = {
    async createCart(req, res) {
        const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
    },

    async updateCart(req, res) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updatedCart);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async deleteCart(req, res) {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json("Cart has been deleted...");
          } catch (err) {
            res.status(500).json(err);
          }
    }, 

    async getCart(req, res) {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId });
            res.status(200).json(cart);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async allCart(req, res){
        try {
            const carts = await Cart.find();
            res.status(200).json(carts);
          } catch (err) {
            res.status(500).json(err);
          }
    }
}

module.exports = cartController