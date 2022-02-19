// import model here

const { product } = require("../../models");

exports.addProduct = async (req, res) => {
  // code here
  try {
    const body = req.body;
    const file = req.file.filename;
    const data = { body, file };
    const newProduct = await product.create({
      ...data,
      title: req.body.title,
      price: req.body.price,
      image: req.file.filename,
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
    const allProducts = await product.findAll({
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

    const data = await product.findOne({
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
    const body = req.body;
    const file = req.file.filename;
    const data = { body, file };
    await product.update(
      {
        ...data,
        title: req.body.title,
        price: req.body.price,
        image: req.file.filename,
      },
      {
        where: {
          id,
        },
      }
    );

    const updateProduct = await product.findOne({ where: { id } });
    res.status(201).send({
      status: "success",
      data: {
        updateProduct,
      },
      message: "update product success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  // code here
  try {
    const { id } = req.params;
    await product.destroy({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
