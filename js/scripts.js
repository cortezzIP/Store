const { Web3 } = require("web3");
const fs = require("fs");

const web3 = new Web3("http://localhost:7545");

const buildFile = fs.readFileSync("./src/build/contracts/CStore.json");
const parsedBuildFile = JSON.parse(buildFile);

const contractAddress = "0x1c587d06b109dA411204c72197b00c2096258903";

const store = new web3.eth.Contract(parsedBuildFile.abi, contractAddress);

web3.eth.defaultAccount = "0x09db776c7B23bcDD4f165a8c1b29197cAAFB688b";

module.exports = {
  createProduct: async function (productId, productName, productPrice) {
    await store.methods
      .createProduct(Number(productId), productName, Number(productPrice))
      .send({
        from: web3.eth.defaultAccount,
        gas: "300000",
        gasPrice: 1000000000,
      })
      .then(function (data) {
        res.send(data.transactionHash);
      });
  },

  shipProduct: async function (productId, storeAddress) {
    await store.methods
      .shipProduct(productId, storeAddress)
      .send({ from: web3.eth.defaultAccount });
  },

  sellProduct: async function (productId, buyerAddress) {
    await store.methods
      .sellProduct(productId, buyerAddress)
      .send({ from: web3.eth.defaultAccount });
  },

  returnProduct: async function (productId) {
    await store.methods
      .returnProduct(productId)
      .send({ from: web3.eth.defaultAccount });
  },

  addSupplier: async function (supplierAddress, supplierRating) {
    await store.methods
      .addSupplier(supplierAddress, supplierRating)
      .send({ from: web3.eth.defaultAccount });
  },
};
