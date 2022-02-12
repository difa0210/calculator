// import model here

const { products } = require("../../models");

exports.addProduct = async (req, res) => {
  // code here
  try {
    const body = req.body;
    const file = req.file.filename;
    const data = { body, file };
    const newProduct = await products.create({
      ...data,
      title: req.body.title,
      price: req.body.price,
      image: req.file.filename,
      quantity: req.body.quantity,
    });
    res.status(201).send({
      status: "success",
      data: {
        newProduct,
      },
      message: "add product success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const allProducts = await products.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        allProducts,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await products.findAll({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        products: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let updateProduct = await products.update(req.body, {
      where: {
        id,
      },
    });

    updateProduct = {
      title: req.body.title,
      price: req.body.price,
      image: updateProduct.image,
      quantity: req.body.quantity,
    };
    const data = await products.findOne({
      where: { id },
    });
    res.send({
      status: "success",
      message: `Update product id: ${id} finished`,
      data: data,
      ...updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  // code here
  try {
    const { id } = req.params;
    await products.destroy({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
