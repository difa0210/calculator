// body productId, toppingIds
// insert ke cart
// carttopping toppingIds Loop
// productid 2 toppingids [1,2,3,5,6]
const joi = require("joi");
const { Op } = require("sequelize");
const { user, topping, product, carttopping, cart } = require("../../models");
exports.addCart = async (req, res) => {
  const schema = joi.object({
    productId: joi.number().required(),
    toppingIds: joi.array(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });
  try {
    const body = req.body;
    const newCart = await cart.create({
      userId: req.user.id,
    });

    for (let i = 0; i < body.length; i++) {
      const item = body[i];
      const p = await product.findOne({ where: { id: item.productId } });
      const t = await topping.findAll({
        where: { id: { [Op.in]: item.toppingIds } },
      });

      const totalPrice =
        p.price +
        t.reduce((a, b) => {
          return a + b.price;
        }, 0);

      const newCartDetail = await cart.create({
        productId: item.productId,
        price: totalPrice,
        cartId: newCart.id,
      });

      for (let j = 0; j < item.toppingIds.length; j++) {
        await carttopping.create({
          toppingId: item.toppingIds[j],
          cartId: newCartDetail.id,
        });
      }
    }
    const getCart = await cart.findOne({
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
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: carttopping,
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
        },
      ],
    });

    res.send({
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

  res.status(200).send();
};
