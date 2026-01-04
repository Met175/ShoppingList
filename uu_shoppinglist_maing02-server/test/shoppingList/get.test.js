const { TestHelper } = require("uu_appg01_server-test");
const { mockDaoFactory, SHOPPING_LIST_GET, SHOPPING_LIST_CREATE, SHOPPING_LIST_ID } = require("./general-test-helper")
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;

beforeAll(async () => {
  await TestHelper.setup();
});
afterAll(async () => {
  await TestHelper.teardown();
})

beforeEach(async () => {
  await TestHelper.dropDatabase();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.login("AwidInitiator", false)
})

afterEach(async () => {
  jest.restoreAllMocks();
})

test("HDS", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  let create = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "Test SL"});
  let get = await TestHelper.executeGetCommand(SHOPPING_LIST_GET, { id: create.id} );
  expect(get.status).toEqual(200)
  expect(get).toEqual(create);
});

test("A2 - unsupported keys in dtoIn", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  let shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "Test SL"});
  shoppingList = await TestHelper.executeGetCommand(SHOPPING_LIST_GET, {
    id: shoppingList.id,
    unsupportedKey: "unsupportedValue",
  });
  expect(shoppingList.status).toEqual(200);
  let warning = shoppingList.uuAppErrorMap["uu-shoppinglist-main/shoppingList/get/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.")
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.unsupportedKey"])
});

test("A3 - invalid dtoIn", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  try {
    await TestHelper.executeGetCommand(SHOPPING_LIST_GET, {});
  } catch (e) {
    expect(e.code).toEqual("uu-shoppinglist-main/shoppingList/get/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});

test("A4 - shopping list does not exist", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  try {
    await TestHelper.executeGetCommand(SHOPPING_LIST_GET, {id: SHOPPING_LIST_ID});
  } catch (e) {
    expect(e.code).toEqual("uu-shoppinglist-main/shoppingList/get/shoppingListDoesNotExist");
    expect(e.message).toEqual("Shopping list does not exist.");
  }
});


