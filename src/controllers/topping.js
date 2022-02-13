// import model here
const { topping } = require("../../models");

exports.addTopping = async (req, res) => {
  // code here
  try {
    const body = req.body;
    const file = req.file.filename;
    const data = { body, file };
    const newTopping = await topping.create({
      ...data,
      title: req.body.title,
      price: req.body.price,
      image: req.file.filename,
    });
    res.status(201).send({
      status: "success",
      data: {
        newTopping,
      },
      message: "add topping success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getToppings = async (req, res) => {
  try {
    const allTopping = await topping.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        allTopping,
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

exports.getTopping = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await topping.findAll({
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
        topping: data,
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

exports.updateTopping = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const file = req.file.filename;
    const data = { body, file };
    await topping.update(
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

    const updateTopping = await topping.findOne({ where: { id } });
    res.status(201).send({
      status: "success",
      data: {
        updateTopping,
      },
      message: "update topping success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteTopping = async (req, res) => {
  // code here
  try {
    const { id } = req.params;
    await topping.destroy({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
