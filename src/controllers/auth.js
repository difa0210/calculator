const { user } = require("../../models");

const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = joi.object({
    fullName: joi.string().min(3),
    email: joi.string().email().min(5),
    password: joi.string().min(3),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      role: "",
      image: "",
    });

    const SECRET_KEY = "Difa Tampan";
    const token = jwt.sign({ id: user.id }, SECRET_KEY);

    res.status(201).send({
      status: "success",
      data: {
        user: {
          fullName: newUser.fullName,
          email: newUser.email,
          token,
        },
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

exports.login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().min(5),
    password: joi.string().min(3),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updateAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email & Password not found",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "Email & Password not found",
      });
    }

    // const tokenData = {
    //   id: userExist.id,
    //   fullName: userExist.fullName,
    //   email: userExist.email,
    //   status: userExist.status,
    // };

    const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          fullName: userExist.fullName,
          email: userExist.email,
          token,
        },
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

exports.checkAuth = async (req, res) => {
  try {
    const { id } = req.user;

    const data = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!data) {
      return res.status(404).send({
        status: "failed",
      });
    }
    res.send({
      status: "success",
      data: {
        user: {
          id: data.id,
          name: data.fullName,
          email: data.email,
          role: data.role,
        },
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
