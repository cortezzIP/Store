const { Web3 } = require("web3");
const fs = require("fs");

const web3 = new Web3("http://localhost:7545");

const buildFile = fs.readFileSync("./src/build/contracts/CStore.json");
const parsedBuildFile = JSON.parse(buildFile);

const contractAddress = "0x66AA853D2bA98333c33db8BCF9e6F455FC4Ea654";

const store = new web3.eth.Contract(parsedBuildFile.abi, contractAddress);

web3.eth.defaultAccount = "0x6b8B3802d24749572F81a1efDF20F0074aF8cD70";

module.exports = {
  createProduct: async function (productId, productName, productPrice) {
    await store.methods
      .createProduct(productId, productName, productPrice)
      .send({ from: web3.eth.defaultAccount });
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
  }
};
