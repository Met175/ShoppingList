const { TestHelper } = require("uu_appg01_server-test");
const { mockDaoFactory, SHOPPING_LIST_GET, SHOPPING_LIST_CREATE, SHOPPING_LIST_ID, SHOPPING_LIST_UPDATE, SHOPPING_LIST_DELETE } = require("./general-test-helper")
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

test("HDS - title, active", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  let title = "Test SL";
  let create = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: title});
  let update = await TestHelper.executePostCommand(SHOPPING_LIST_UPDATE, {
    id: create.id,
    title: `updated ${title}`,
    active: false
  });
  expect(update.status).toEqual(200);
  expect(update.data.shoppingList.title).not.toEqual(create.title);
  expect(update.data.shoppingList.title).toEqual(`updated ${title}`);
  expect(update.data.shoppingList.active).toBe(false)
});

test("HDS - members", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  let title = "Test SL";
  let create = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: title});
  let update = await TestHelper.executePostCommand(SHOPPING_LIST_UPDATE, {
    id: create.id,
    members: ["0000-0000-0000-0000"]
  });
  expect(update.status).toEqual(200);
  expect(update.data.shoppingList.members).not.toEqual(create.members);
  expect(update.data.shoppingList.members).toEqual(["0000-0000-0000-0000"]);
});


test("A2 - unsupported keys in dtoIn", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  let shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "Test SL"});
  shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_UPDATE, {
    id: shoppingList.id,
    unsupportedKey: "unsupportedValue",
  });
  expect(shoppingList.status).toEqual(200);
  let warning = shoppingList.uuAppErrorMap["uu-shoppinglist-main/shoppingList/update/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.")
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.unsupportedKey"])
});

test("A3 - invalid dtoIn", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  try {
    await TestHelper.executePostCommand(SHOPPING_LIST_UPDATE, {});
  } catch (e) {
    expect(e.code).toEqual("uu-shoppinglist-main/shoppingList/update/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});

test("A4 - shopping list does not exist", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  try {
    await TestHelper.executePostCommand(SHOPPING_LIST_UPDATE, {id: SHOPPING_LIST_ID});
  } catch (e) {
    expect(e.code).toEqual("uu-shoppinglist-main/shoppingList/update/shoppingListDoesNotExist");
    expect(e.message).toEqual("Shopping list does not exist.");
  }
});

test("A5 - no permission", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Authorities");
  const shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "Test SL" });
  await TestHelper.login("Executives");
  try {
    await TestHelper.executePostCommand(SHOPPING_LIST_UPDATE, {id: shoppingList.id});
  } catch (e) {
    expect(e.code).toEqual("uu-shoppinglist-main/shoppingList/update/userDoesNotHavePermission");
    expect(e.message).toEqual("User does not have permission to update shopping list.");
  }
});




