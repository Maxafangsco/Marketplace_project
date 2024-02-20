 const  Product  = require("../models/product");


// Controller getAllProducts

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Controller for GET product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller for POST a new product
 const addProduct = async (req, res) => {
  try {
    const { name, description, price,quantity, category} = req.body;

    // Create a new product instance using the data from the request body
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
      category
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct); // Respond with the newly created product
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
};

// Controller for PUT (update) product by ID
const updateProductById =  async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.category = req.body.category
  

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for DELETE product by ID
const deleteProductById =  async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    //await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Controller for DELETE all product 
const deleteAllProduct =  async (req, res) => {
  try {
    const product = await Product.deleteMany();
    if (!product) return res.status(404).json({ message: 'Product not found' });


    res.json({ message: 'All Products deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const queryString = async (req, res) => {
  try {
    const { name } = req.query;

    // If name query parameter is provided
    if (name) {
      const products = await Product.find({ name: { $regex: name, $options: 'i' } });
      res.json(products);
    } else {
      
      // If name query parameter is not provided, return all products
      const products = await Product.find();
      res.json(products);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts,getProductById, addProduct, updateProductById, deleteProductById, deleteAllProduct,queryString };

  