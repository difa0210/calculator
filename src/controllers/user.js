// import model here
const { user } = require("../../models");

exports.addUsers = async (req, res) => {
  // code here
  try {
    await user.create(req.body);
    res.send({
      status: "success",
      message: "add user success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
