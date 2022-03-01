// body productId, toppingIds
// insert ke cart
// carttopping toppingIds Loop
// productid 2 toppingids [1,2,3,5,6]
const joi = require("joi");
const { Op } = require("sequelize");
const { user, topping, product, CartTopping, Cart } = require("../../models");
exports.addCart = async (req, res) => {
  const schema = joi.object({
    productId: joi.number().required(),
    toppingIds: joi.array().required(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });
  try {
    const body = req.body;

    const p = await product.findOne({ where: { id: body.productId } });
    const t = await topping.findAll({
      where: { id: { [Op.in]: body.toppingIds } },
    });

    const totalPrice =
      p.price +
      t.reduce((a, b) => {
        return a + b.price;
      }, 0);

    const newCart = await Cart.create({
      userId: req.user.id,
      productId: body.productId,
      price: totalPrice,
    });

    for (let j = 0; j < body.toppingIds.length; j++) {
      await CartTopping.create({
        toppingId: body.toppingIds[j],
        cartId: newCart.id,
      });
    }

    const getCart = await Cart.findOne({
      where: {
        id: newCart.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "image", "role"],
          },
        },
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: CartTopping,
          as: "carttopping",
          include: [
            {
              model: topping,
              as: "topping",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    });

    res.status(200).send({
      status: "success",
      data: getCart,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getCarts = async (req, res) => {
  try {
    const allCart = await Cart.findAll({
      where: { userId: req.user.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "image", "role"],
          },
        },
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: CartTopping,
          as: "carttopping",
          include: [
            {
              model: topping,
              as: "topping",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    });

    res.status(200).send({
      status: "success",
      data: allCart,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const allCart = await Cart.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "image", "role"],
          },
        },
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: CartTopping,
          as: "carttopping",
          include: [
            {
              model: topping,
              as: "topping",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    });

    res.status(200).send({
      status: "success",
      data: allCart,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteCart = async (req, res) => {
  // code here
  try {
    const { id } = req.params;
    await Cart.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "success",
      message: "delete success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
