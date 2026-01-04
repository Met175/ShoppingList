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
  expect(create.status).toEqual(200)
  let dtoOut = create;
  expect(dtoOut.title).toEqual("Test SL");
  expect(dtoOut.ownerUuId).toEqual("3039-912-8064-0000")
  expect(dtoOut.active).toBeTruthy;
  expect(dtoOut.awid).toEqual(TestHelper.getAwid());
  expect(dtoOut.members).toEqual([]);
});

test("A2 - unsupported keys in dtoIn", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  let shoppingList = await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, {
    title: "Test SL",
    unsupportedKey: "unsupportedValue",
  });
  expect(shoppingList.status).toEqual(200);
  let warning = shoppingList.uuAppErrorMap["uu-shoppinglist-main/shoppingList/create/unsupportedKeys"];
  expect(warning).toBeTruthy();
  expect(warning.type).toEqual("warning");
  expect(warning.message).toEqual("DtoIn contains unsupported keys.")
  expect(warning.paramMap.unsupportedKeyList).toEqual(["$.unsupportedKey"])
});

test("A3 - invalid dtoIn", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")
  try {
    await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, {});
  } catch (e) {
    expect(e.code).toEqual("uu-shoppinglist-main/shoppingList/create/invalidDtoIn");
    expect(e.message).toEqual("DtoIn is not valid.");
  }
});



