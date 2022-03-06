const { List } = require("../../models");
const joi = require("joi");

exports.addList = async (req, res) => {
  const schema = joi.object({
    title: joi.string().min(5),
    content: joi.string().min(5),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });

  try {
    const newList = await List.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.status(201).send({
      status: "success",
      data: {
        newList,
      },
      message: "add list success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getLists = async (req, res) => {
  try {
    const allLists = await List.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: "get lists success",
      data: {
        allLists,
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

exports.getList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      message: `get list ${id} success`,
      data: {
        list,
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

exports.updateList = async (req, res) => {
  try {
    const { id } = req.params;
    // const body = req.body;
    // const file = req.file.filename;
    // const data = { body, file };
    await List.update(
      {
        // ...data,
        title: req.body.title,
        content: req.body.content,
        // image: req.file.filename,
      },
      {
        where: {
          id,
        },
      }
    );

    const patchList = await List.findOne({ where: { id } });
    res.status(201).send({
      status: "success",
      message: `update list ${id} success`,
      data: {
        patchList,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await List.destroy({
      where: {
        id,
      },
    });
    res
      .status(201)
      .send({ status: "success", message: `delete list ${id} success` });
  } catch (error) {
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
