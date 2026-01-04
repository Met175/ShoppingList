const { TestHelper } = require("uu_appg01_server-test");
const { mockSession, SHOPPING_LIST_GET, SHOPPING_LIST_CREATE, SHOPPING_LIST_ID, SHOPPING_LIST_DELETE } = require("./general-test-helper")

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
  let shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "Test SL"});
  shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_DELETE, { id: shoppingList.id} );
  expect(shoppingList.status).toEqual(200)
});

test("A2 - unsupported keys in dtoIn", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  let shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "Test SL"});
  shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_DELETE, {
    id: shoppingList.id,
    unsupportedKey: "unsupportedValue",
  });
  expect(shoppingList.status).toEqual(200);
  let warning = shoppingList.uuAppErrorMap["uu-shoppinglist-main/shoppingList/delete/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.")
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.unsupportedKey"])
});

test("A3 - invalid dtoIn", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  try {
    await TestHelper.executePostCommand(SHOPPING_LIST_DELETE, {});
  } catch (e) {
    expect(e.code).toEqual("uu-shoppinglist-main/shoppingList/delete/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});

test("A4 - shopping list does not exist", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  try {
    await TestHelper.executePostCommand(SHOPPING_LIST_DELETE, {id: SHOPPING_LIST_ID});
  } catch (e) {
    expect(e.code).toEqual("uu-shoppinglist-main/shoppingList/delete/shoppingListDoesNotExist");
    expect(e.message).toEqual("Shopping list does not exist.");
  }
});

test("A5 - no permission", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Authorities");
  const shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "Test SL" });
  await TestHelper.login("Executives");
  try {
    await TestHelper.executePostCommand(SHOPPING_LIST_DELETE, {id: shoppingList.id});
  } catch (e) {
    expect(e.code).toEqual("uu-shoppinglist-main/shoppingList/delete/userDoesNotHavePermission");
    expect(e.message).toEqual("User does not have permission to delete shopping list.");
  }
});


