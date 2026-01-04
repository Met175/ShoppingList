const { TestHelper } = require("uu_appg01_server-test");
const { mockDaoFactoryFind, SHOPPING_LIST_GET, SHOPPING_LIST_CREATE, SHOPPING_LIST_ID, SHOPPING_LIST_UPDATE, SHOPPING_LIST_LIST } = require("./general-test-helper")
const { ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { DaoFactory } = require('uu_appg01_server').ObjectStore
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

test("HDS - sort by name, asc order", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")

  await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "SL 1"});
  await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "SL 2"});
  await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "SL 3"});

  let list = await TestHelper.executeGetCommand(SHOPPING_LIST_LIST, {
  });
  expect(list.status).toEqual(200);
  let dtoOut = list
  expect(dtoOut.pageInfo.total).toEqual(3);
  expect(dtoOut.pageInfo.pageIndex).toEqual(0);
  expect(dtoOut.pageInfo.pageSize).toEqual(100)
  expect(dtoOut.itemList[0].title).toEqual("SL 1");
  expect(dtoOut.itemList[1].title).toEqual("SL 2");
  expect(dtoOut.itemList[2].title).toEqual("SL 3");
});

test("HDS - page info", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")

  await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "SL 1"});
  await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "SL 2"});
  await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "SL 3"});

  let pIndex = 2;
  let pSize = 1;
  let list = await TestHelper.executeGetCommand(SHOPPING_LIST_LIST, {
    pageInfo: { pageIndex: pIndex, pageSize: pSize }
  });
  expect(list.status).toEqual(200);
  let dtoOut = list
  expect(dtoOut.pageInfo.total).toEqual(3);
  expect(dtoOut.pageInfo.pageIndex).toEqual(pIndex);
  expect(dtoOut.pageInfo.pageSize).toEqual(pSize)
  expect(dtoOut.itemList[0].title).toEqual("SL 2");
});

test("HDS - active filtering", async () => {
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: ".", state: "active"})
  await TestHelper.login("Executives")

  await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "SL 1"});
  await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "SL 2"});
  await TestHelper.executePostCommand(SHOPPING_LIST_CREATE, { title: "SL 3"});

  let list = await TestHelper.executeGetCommand(SHOPPING_LIST_LIST, {
    active: false,
  });
  expect(list.status).toEqual(200);
  let dtoOut = list.itemList.map(i => i.title);
  expect(dtoOut).toEqual([]);
  expect(dtoOut).not.toContain("SL 2");
  expect(list.pageInfo.total).toEqual(0);

  let list2 = await TestHelper.executeGetCommand(SHOPPING_LIST_LIST, {
    ownerUuId: "0000-0000-0000-0000",
  });
  expect(list2.status).toEqual(200);
  let dtoOut2 = list2.itemList.map(i => i.title);
  expect(dtoOut2).toEqual([]);

  let lists = await TestHelper.executeGetCommand(SHOPPING_LIST_LIST, { active: true });
  let sl1 = lists.itemList.find(l => l.title === "SL 1");
  await TestHelper.executePostCommand(SHOPPING_LIST_UPDATE, { id: sl1.id, members: ["0000-0000-0000-1111"] });

  let list3 = await TestHelper.executeGetCommand(SHOPPING_LIST_LIST, {
    memberIdList: ["0000-0000-0000-1111"],
  });
  expect(list3.status).toEqual(200);
  let dtoOut3 = list3.itemList.map(i => i.title);
  expect(dtoOut3).toEqual(["SL 1"]);

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




