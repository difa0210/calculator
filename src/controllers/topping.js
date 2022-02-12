// import model here
const { topping } = require("../../models");

exports.addTopping = async (req, res) => {
  // code here
  try {
    await topping.create(req.body);
    res.send({
      status: "success",
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
    const toppings = await topping.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        toppings,
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

    await topping.update(req.body, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update topping id: ${id} finished`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
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
