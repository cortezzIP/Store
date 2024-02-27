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
        address store;
        uint price;
    }

    struct Supplier {
        address addr;
        uint rating;
        uint[] productIds;
    }

    struct Store {
        uint id;
        mapping (uint => uint) numberOfProducts;
    }

    mapping (uint => Store) public stores;
    mapping (address => Roles) public users;
    mapping (uint => Product) public products;
    mapping (address => Supplier) public suppliers;

    function createProduct(uint _id, string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Имя введено некорректно!");
        require(_price > 0, "Цена введена некорректно!");
        require(products[_id].id != _id, "Продукт с таким ID уже существует!");
        require(msg.sender == suppliers[msg.sender].addr, "Вы не являетесь поставщиком!");
        products[_id] = Product(_id, _name, msg.sender, address(0), _price);
    }

    // function createStore(uint _id) public {
    //     require(stores[_id].id != _id, "Магазин с таким ID уже существует!");
    //     stores[_id] = Store(_id, );
    // }

    function shipProduct(uint _productId, address _store) public {
        require(products[_productId].supplier == msg.sender, "Вы не являетесь поставщиком!");
        products[_productId].store = _store;
    }

    function sellProduct(uint _productId, address _buyer) public {
        // require(products[_productId].count - numberOfProducts > 0, "Товара не достаточно!");
        require(products[_productId].store == msg.sender, "Вы не являетесь владельцем товара!");
        products[_productId].store = _buyer;
        // products[_productId].count = products[_productId].count - numberOfProducts;
    }

    function returnProduct(uint _productId) public {
        require(products[_productId].store == msg.sender, "Вы не являетесь владельцем товара!");
        products[_productId].store = products[_productId].supplier;
        // products[_productId].count = products[_productId].count + ;
    }

    function addSupplier(address _addr, uint _rating) public {
        Supplier memory newSupplier = Supplier(_addr, _rating, new uint[](0));
        suppliers[_addr] = newSupplier;
    }

    function updateRole(address _addr, Roles _role) public {
        users[_addr] = _role;
    }
}