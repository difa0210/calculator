const joi = require("joi");
const { Op } = require("sequelize");
const {
  transaction,
  transactionDetail,
  transactionDetailTopping,
  user,
  topping,
  product,
  Cart,
  CartTopping,
} = require("../../models");

const { transactionStatus } = require("../helpers/constans");

// exports.addTransaction = async (req, res) => {
//   const schema = joi.object({
//     transactionDetails: joi
//       .array()
//       .items({
//         productId: joi.number().required(),
//         qty: joi.number().min(1).required(),
//         toppingIds: joi.array(),
//       })
//       .length(1)
//       .required(),
//   });

//   const { error } = schema.validate(req.body);
//   if (error)
//     return res.status(400).send({
//       error,
//     });

//   try {
//     const body = req.body;
//     const newTransaction = await transaction.create({
//       userId: req.user.id,
//       status: transactionStatus.WAITING_APPROVE,
//     });

//     for (let i = 0; i < body.transactionDetails.length; i++) {
//       const item = body.transactionDetails[i];
//       const p = await product.findOne({ where: { id: item.productId } });
//       const t = await topping.findAll({
//         where: { id: { [Op.in]: item.toppingIds } },
//       });

//       const totalPrice =
//         p.price +
//         t.reduce((a, b) => {
//           return a + b.price;
//         }, 0);

//       const newTransactionDetail = await transactionDetail.create({
//         productId: item.productId,
//         qty: item.qty,
//         transactionId: newTransaction.id,
//         price: totalPrice,
//       });

//       for (let j = 0; j < item.toppingIds.length; j++) {
//         await transactionDetailTopping.create({
//           toppingId: item.toppingIds[j],
//           transactionDetailId: newTransactionDetail.id,
//         });
//       }
//     }
//     const getTransaction = await transaction.findOne({
//       where: {
//         id: newTransaction.id,
//       },
//       attributes: {
//         exclude: ["createdAt", "updatedAt"],
//       },
//       include: [
//         {
//           model: user,
//           as: "user",
//           attributes: {
//             exclude: ["createdAt", "updatedAt", "password", "image", "role"],
//           },
//         },
//         {
//           model: transactionDetail,
//           as: "transactionDetail",
//           attributes: {
//             exclude: ["createdAt", "updatedAt"],
//           },
//           include: [
//             {
//               model: product,
//               as: "product",
//               attributes: {
//                 exclude: ["createdAt", "updatedAt"],
//               },
//             },
//             {
//               model: transactionDetailTopping,
//               as: "transactionDetailTopping",
//               include: [
//                 {
//                   model: topping,
//                   as: "topping",
//                   attributes: {
//                     exclude: ["createdAt", "updatedAt"],
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     res.status(200).send({
//       status: "success",
//       data: {
//         transaction: {
//           id: getTransaction.id,
//           userOrder: getTransaction.user,
//           status: getTransaction.status,
//           order: getTransaction.transactionDetail.map((x) => ({
//             price: x.price,
//             ...x.product.dataValues,
//             topping: x.transactionDetailTopping.map((xx) => ({
//               ...xx.topping.dataValues,
//             })),
//           })),
//         },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       status: "failed",
//       message: "server error",
//     });
//   }
// };

exports.addTransaction = async (req, res) => {
  const schema = joi.object({
    transactionDetails: joi
      .array()
      .items({
        cartId: joi.array().required(),
        // qty: joi.number().min(1).required(),
        // totalPrice: joi.number().min(1).required(),
        // name: joi.string().required(),
        // email: joi.string().email().required(),
        // phone: joi.number().required(),
        // posCode: joi.number().required(),
        // address: joi.string().required(),
      })
      .length(1)
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });

  try {
    const cartId = await Cart.findAll({
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

    const newTransaction = await transaction.create({
      userId: cartId.map((x) => x.user.id),
      status: transactionStatus.WAITING_APPROVE,
    });

    // for (let i = 0; i < body.transactionDetails.length; i++) {
    // const cartToppings = await CartTopping.findAll({
    //   where: { cartId: req.params },
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt"],
    //   },
    //   include: [
    //     {
    //       model: topping,
    //       as: "topping",
    //       attributes: {
    //         exclude: ["createdAt", "updatedAt"],
    //       },
    //     },
    //   ],
    // });

    // const item = body.transactionDetails[i];
    // const p = cartId.map((x) => x.product.id);
    // const t = cartId.map((x) =>
    //   x.carttopping.map((xx) => {
    //     [Op.in] = xx.topping.id;
    //   })
    // );

    // const totalPrice =
    //   p.price +
    //   t.reduce((a, b) => {
    //     return a + b.price;
    //   }, 0);

    const newTransactionDetail = await transactionDetail.create({
      transactionId: newTransaction.id,
      productId: cartId.map((x) => x.product.id),
      qty: 1,
      price: 1,
    });

    // for (let j = 0; j < body.transactionDetails[i].length; j++) {
    await transactionDetailTopping.create({
      toppingId: cartId.map((x) => x.carttopping.map((xx) => xx.topping.id)),
      transactionDetailId: newTransactionDetail.id,
    });

    const getTransaction = await transaction.findOne({
      where: {
        id: newTransaction.id,
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
          model: transactionDetail,
          as: "transactionDetail",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: transactionDetailTopping,
              as: "transactionDetailTopping",
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

    res.status(200).send({
      status: "success",
      data: getTransaction,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const allTransactions = await transaction.findAll({
      // where: {
      //   userId: req.user.id,
      // },
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
          model: transactionDetail,
          as: "transactionDetail",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: transactionDetailTopping,
              as: "transactionDetailTopping",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
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

    res.status(201).send({
      status: "success",
      data: {
        transaction: allTransactions.map((item) => ({
          Id: item.userId,
          userOrder: item.user,
          status: item.status,
          order: item.transactionDetail.map((x) => ({
            ...x.product.dataValues,
            topping: x.transactionDetailTopping.map((xx) => ({
              ...xx.topping.dataValues,
            })),
            totalPrice: x.price,
          })),
        })),
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

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const Transaction = await transaction.findOne({
      where: {
        id,
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
          model: transactionDetail,
          as: "transactionDetail",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: transactionDetailTopping,
              as: "transactionDetailTopping",
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

    res.status(201).send({
      status: "success",
      data: {
        transaction: {
          id: Transaction.id,
          userOrder: Transaction.user,
          status: Transaction.status,
          order: Transaction.transactionDetail.map((x) => ({
            ...x.product.dataValues,
            topping: x.transactionDetailTopping.map((xx) => ({
              ...xx.topping.dataValues,
            })),
            totalPrice: x.price,
          })),
        },
      },
      message: "get transaction success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await transaction.update(
      {
        status: body.status,
      },
      {
        where: {
          id,
        },
      }
    );

    const updateTransaction = await transaction.findOne({
      where: { id },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "image", "role"],
          },
        },
        {
          model: transactionDetail,
          as: "transactionDetail",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: transactionDetailTopping,
              as: "transactionDetailTopping",
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
    res.status(201).send({
      status: "success",
      data: {
        transaction: {
          id: updateTransaction.id,
          userOrder: updateTransaction.user,
          status: updateTransaction.status,
          order: updateTransaction.transactionDetail.map((x) => ({
            price: x.price,
            ...x.product.dataValues,
            topping: x.transactionDetailTopping.map((xx) => ({
              ...xx.topping.dataValues,
            })),
          })),
        },
      },
      message: "update transaction success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  // code here
  try {
    const { id } = req.params;
    await transaction.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "delete success",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.userTransactions = async (req, res) => {
  try {
    const allTransactions = await transaction.findAll({
      where: {
        userId: req.user.id,
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
          model: transactionDetail,
          as: "transactionDetail",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: transactionDetailTopping,
              as: "transactionDetailTopping",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
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

    res.status(201).send({
      status: "success",
      data: {
        transaction: allTransactions.map((item) => ({
          Id: item.userId,
          userOrder: item.user,
          status: item.status,
          order: item.transactionDetail.map((x) => ({
            ...x.product.dataValues,
            topping: x.transactionDetailTopping.map((xx) => ({
              ...xx.topping.dataValues,
            })),
            totalPrice: x.price,
          })),
        })),
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
