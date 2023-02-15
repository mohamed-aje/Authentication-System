const { request, response } = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    const jwtToken = request.header("token");
    if (!jwtToken) {
      return response.status(403).json("Not Authorized");
    }
    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY);
    request.user = payload.user;
  } catch (error) {
    console.error(error.message);
    response.status(403).json("Not Authorized");
  }
};
