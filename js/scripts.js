import * as contractData from "../js/contractData.js";

function changePage() {
  const roleId = document.getElementById("roleId").value;
  switch (roleId) {
    case "1":
      location.href = "pages/admin.html";
      break;
    case "2":
      location.href = "pages/supplier.html";
      break;
    case "3":
      location.href = "pages/buyer.html";
      break;
    case "4":
      location.href = "pages/seller.html";
      break;
    case "5":
      location.href = "pages/store.html";
      break;
  }
}

const web3 = new Web3("http://localhost:7545");

const store = new web3.eth.Contract(
  contractData.abi,
  contractData.contractData
);

web3.eth.defaultAccount = "0x5a8d743941876FAcfC3d16fDddC54519Ab05F7c5";

async function createProduct() {
  const productId = document.getElementById("productId").value;
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  await store.methods
    .createProduct(productId, productName, productPrice)
    .send({ from: web3.eth.defaultAccount });
}

async function shipProduct() {
  const productId = document.getElementById("shipProductId").value;
  const storeAddress = document.getElementById("shipStoreAddress").value;
  await store.methods
    .shipProduct(productId, storeAddress)
    .send({ from: web3.eth.defaultAccount });
}

async function sellProduct() {
  const productId = document.getElementById("sellProductId").value;
  const buyerAddress = document.getElementById("sellBuyerAddress").value;
  await store.methods
    .sellProduct(productId, buyerAddress)
    .send({ from: web3.eth.defaultAccount });
}

async function returnProduct() {
  const productId = document.getElementById("returnProductId").value;
  await store.methods
    .returnProduct(productId)
    .send({ from: web3.eth.defaultAccount });
}

async function addSupplier() {
  const supplierAddress = document.getElementById("supplierAddress").value;
  const supplierRating = document.getElementById("supplierRating").value;
  await store.methods
    .addSupplier(supplierAddress, supplierRating)
    .send({ from: web3.eth.defaultAccount });
}
