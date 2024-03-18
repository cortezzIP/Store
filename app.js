const fs = require("fs");
const express = require("express");
const { Web3 } = require("web3");
//const scripts = require("./js/scripts");

const web3 = new Web3("http://localhost:7545");

const buildFile = fs.readFileSync("./src/build/contracts/CStore.json");
const parsedBuildFile = JSON.parse(buildFile);

const contractAddress = "0x1c587d06b109dA411204c72197b00c2096258903";

const store = new web3.eth.Contract(parsedBuildFile.abi, contractAddress);

web3.eth.defaultAccount = "0x09db776c7B23bcDD4f165a8c1b29197cAAFB688b";

const app = express();
const urlencodedParser = express.urlencoded({ extended: false });

app.use(express.static(__dirname + "/"));

app.post("/", urlencodedParser, function (request, response) {
  //if (!request.body) return response.sendStatus(400);
  console.log(request.body);
  var productId = request.body.productId;
  var productName = request.body.productName;
  var productPrice = request.body.productPrice;
  console.log(`${productId} - ${productName} - ${productPrice}`);
  store.methods
    .createProduct(Number(productId), productName, Number(productPrice))
    .send({
      from: web3.eth.defaultAccount,
      gas: "300000",
      gasPrice: 1000000000,
    })
    .then(function (data) {
      res.send(data.transactionHash);
    });
});

app.listen(7545, () => {
  console.log("Сервер запущен... (port: 7545)");
});
