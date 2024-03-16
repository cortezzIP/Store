// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CStore {
    enum Roles {
        Admin,
        Supplier,
        Buyer,
        Seller,
        Store
    }

    struct Product {
        uint id;
        string name;
        address supplier;
        uint price;
        uint numberOfProducts;
    }

    struct Purchase {
        address buyer;
        uint productId;
        uint numberOfProducts;
    }

    struct Supplier {
        address addr;
        int rating;
        uint[] productIds;
    }

    mapping (address => Roles) public users;
    mapping (address => Supplier) public suppliers;
    mapping (uint => Product) public products;
    mapping (uint => Purchase) public purchases;

    // +
    function createProduct(uint _id, string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "The name was entered incorrectly!");
        require(_price > 0, "The price was entered incorrectly!");
        require(products[_id].id != _id, "A product with this ID already exists!");
        require(msg.sender == suppliers[msg.sender].addr, "You are not a supplier!");
        products[_id] = Product(_id, _name, msg.sender, _price, 0);
    }

    // +
    function addSupplier(address _addr, int _rating) public {
        require(_addr != suppliers[msg.sender].addr, "A supplier with this address already exists!");
        Supplier memory newSupplier = Supplier(_addr, _rating, new uint[](0));
        suppliers[_addr] = newSupplier;
    }

    // +
    function shipProduct(uint _productId, uint _numberOfProducts) public {
        require(products[_productId].id != 0, "The product doesn't exist!");
        require(products[_productId].supplier == msg.sender, "You are not a supplier!");
        products[_productId].numberOfProducts = products[_productId].numberOfProducts + _numberOfProducts;
    }

    // +
    function sellProduct(uint _purchaseId, address _buyer, uint _productId, uint _numberOfProducts) public {
        require(products[_productId].id != 0, "There is no such product in the store!");
        require(products[_productId].numberOfProducts - _numberOfProducts > 0, "The product is not enough!");
        Purchase memory newPurchase = Purchase(_buyer, _productId, _numberOfProducts);
        purchases[_purchaseId] = newPurchase;
        products[_productId].numberOfProducts = products[_productId].numberOfProducts - _numberOfProducts;
    }

    // +
    function returnProduct(uint _purchaseId) public {
        require(purchases[_purchaseId].buyer != address(0), "The purchase doesn't exist");
        require(purchases[_purchaseId].buyer == msg.sender, "The purchase was not made by you!");
        require(purchases[_purchaseId].productId == _purchaseId, "You have not bought this product!");
        products[purchases[_purchaseId].productId].numberOfProducts = products[purchases[_purchaseId].productId].numberOfProducts + purchases[_purchaseId].numberOfProducts;
        delete purchases[_purchaseId];
    }

    function updateRole(address _addr, Roles _role) public {
        users[_addr] = _role;
    }
}