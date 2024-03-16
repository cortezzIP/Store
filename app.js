const fs = require("fs");
const express = require("express");
const scripts = require("./js/scripts");

const app = express();
const urlencodedParser = express.urlencoded({ extended: false });

app.use(express.static(__dirname + "/"));

app.post("/", urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  scripts.createProduct(
    request.body.productId,
    request.body.productName,
    request.body.productPrice
  );

  response.send("ok");
});

app.listen(7545, () => {
  console.log("Сервер запущен... (port: 7545)");
});
