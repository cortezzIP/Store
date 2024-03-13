function changePage() {
    const roleId = document.getElementById('roleId').value;
    switch (roleId) {
        case '1':
            location.href = 'pages/admin.html';
            break;
        case '2':
            location.href = 'pages/supplier.html';
            break;
        case '3':
            location.href = 'pages/buyer.html';
            break;
        case '4':
            location.href = 'pages/seller.html';
            break;
        case '5':
            location.href = 'pages/store.html';
            break;
    }
}

const web3 = new Web3('http://localhost:7545');

const contractAddress = '0xE0793B0003c9fae7C47DeAB5339eb9e379E95696';
const abi = [
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "products",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "supplier",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "store",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "stores",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "suppliers",
      "outputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "rating",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "enum CStore.Roles",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "createProduct",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_store",
          "type": "address"
        }
      ],
      "name": "shipProduct",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_buyer",
          "type": "address"
        }
      ],
      "name": "sellProduct",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_productId",
          "type": "uint256"
        }
      ],
      "name": "returnProduct",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_rating",
          "type": "uint256"
        }
      ],
      "name": "addSupplier",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        },
        {
          "internalType": "enum CStore.Roles",
          "name": "_role",
          "type": "uint8"
        }
      ],
      "name": "updateRole",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];


const store = new web3.eth.Contract(abi, contractAddress);

web3.eth.defaultAccount = '0x5a8d743941876FAcfC3d16fDddC54519Ab05F7c5';

async function createProduct() {
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    await store.methods.createProduct(productId, productName, productPrice).send({ from: web3.eth.defaultAccount });
}

async function shipProduct() {
    const productId = document.getElementById('shipProductId').value;
    const storeAddress = document.getElementById('shipStoreAddress').value;
    await store.methods.shipProduct(productId, storeAddress).send({ from: web3.eth.defaultAccount });
}

async function sellProduct() {
    const productId = document.getElementById('sellProductId').value;
    const buyerAddress = document.getElementById('sellBuyerAddress').value;
    await store.methods.sellProduct(productId, buyerAddress).send({ from: web3.eth.defaultAccount });
}

async function returnProduct() {
    const productId = document.getElementById('returnProductId').value;
    await store.methods.returnProduct(productId).send({ from: web3.eth.defaultAccount });
}

async function addSupplier() {
    const supplierAddress = document.getElementById('supplierAddress').value;
    const supplierRating = document.getElementById('supplierRating').value;
    await store.methods.addSupplier(supplierAddress, supplierRating).send({ from: web3.eth.defaultAccount });
}