const Store = artifacts.require("Store");

contract("Store", (accounts) => {
  const [owner, addr1, addr2] = accounts;
  let store;

  beforeEach(async () => {
    store = await Store.new();
    await store.addSupplier(addr1,  100);
  });

  it("Should create a new product", async () => {
    // Попытка создать товар с пустым именем или ценой   0 должна быть неудачной
    await expectRevert(
      store.createProduct(1, "",  0, { from: addr1 }),
      "Вы не являетесь поставщиком!"
    );
      
    // Попытка создать товар должна быть успешной
    const receipt = await store.createProduct(1, "Test Product",  100, { from: addr1 });
    expectEvent(receipt, "ProductCreated", {
      id: "1",
      name: "Test Product",
      price: "100",
      available: true
    });

    // Проверка, что товар был успешно создан
    const product = await store.products(1);
    expect(product.id.toString()).to.equal("1");
    expect(product.name).to.equal("Test Product");
    expect(product.supplier).to.equal(addr1);
    expect(product.price.toString()).to.equal("100");
    expect(product.available).to.equal(true);
  });

  it("Should ship a product", async () => {
    await store.createProduct(1, "Test Product",  100, { from: addr1 });
    await store.shipProduct(1, addr2, { from: addr1 });

    const product = await store.products(1);
    expect(product.store).to.equal(addr2);
  });

  it("Should add a new supplier", async () => {
    // Попытка добавить поставщика должна быть успешной
    const receipt = await store.addSupplier(addr1,  100, { from: owner });
    expectEvent(receipt, "SupplierAdded", {
      supplier: addr1,
      rating: "100"
    });

    // Проверка, что поставщик был успешно добавлен
    const supplier = await store.suppliers(addr1);
    expect(supplier.addr).to.equal(addr1);
    expect(supplier.rating.toString()).to.equal("100");
  });

  it("Should sell a product", async () => {
    await store.createProduct(1, "Test Product",  100, { from: addr1 });
    await store.shipProduct(1, addr2, { from: addr1 });
    await store.sellProduct(1, addr2, { from: addr2 });

    const product = await store.products(1);
    expect(product.store).to.equal(addr2);
    expect(product.available).to.equal(false);
  });

  it("Should return a product", async () => {
    await store.createProduct(1, "Test Product",  100, { from: addr1 });
    await store.shipProduct(1, addr2, { from: addr1 });
    await store.sellProduct(1, addr2, { from: addr2 });
    await store.returnProduct(1, { from: addr2 });

    const product = await store.products(1);
    expect(product.store).to.equal(addr1);
    expect(product.available).to.equal(true);
  });
});