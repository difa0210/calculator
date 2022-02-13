const joi = require("joi");
const {
  transaction,
  transactionDetail,
  transactionDetailTopping,
  user,
  topping,
} = require("../../models");
const { transactionStatus } = require("../helpers/constans");

exports.addTransaction = async (req, res) => {
  const schema = joi.object({
    transactionDetails: joi
      .array()
      .items({
        productId: joi.number().required(),
        qty: joi.number().min(1).required(),
        toppingIds: joi.array(),
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
    const body = req.body;
    const newTransaction = await transaction.create({
      userId: req.user.id,
      status: transactionStatus.WAITING_APPROVE,
    });

    body.transactionDetails.forEach(async (el) => {
      const newTransactionDetail = await transactionDetail.create({
        productId: el.productId,
        qty: el.qty,
        transactionId: newTransaction.id,
      });

      el.toppingIds.forEach(async (tp) => {
        await transactionDetailTopping.create({
          toppingId: tp,
          transactionDetailId: newTransactionDetail.id,
        });
      });
    });

    const transact = await transaction.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: { id: newTransaction.id },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: transactionDetail,
          as: "transactionDetail",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.status(201).send({
      status: "success",
      data: {
        transact,
      },
      message: "Transaction Created!",
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

exports.getTransactions = async (req, res) => {
  try {
    const allTransactions = await transaction.findAll({
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
        },
      ],
    });

    res.send({
      data: {
        allTransactions,
      },
      status: "success",
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
    const Transaction = await transaction.findAll({
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
        },
      ],
    });

    res.send({
      status: "success",
      data: {
        transaction: Transaction,
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
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const file = req.file.filename;
    const data = { body, file };
    await transaction.update(
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

    const updateTransaction = await product.findOne({ where: { id } });
    res.status(201).send({
      status: "success",
      data: {
        updateTransaction,
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
  } catch (err) {
    console.log(err);
  }
};
