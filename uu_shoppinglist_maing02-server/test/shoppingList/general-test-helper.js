const { DaoFactory } = require('uu_appg01_server').ObjectStore
const ShoppingListMongo = require('../../app/dao/shopping-list-mongo')

const SHOPPING_LIST_CREATE = "shoppingList/create"
const SHOPPING_LIST_UPDATE = "shoppingList/update"
const SHOPPING_LIST_DELETE = "shoppingList/delete"
const SHOPPING_LIST_GET = "shoppingList/get"
const SHOPPING_LIST_LIST = "shoppingList/list"
const SHOPPING_LIST_ID = "6947313d4837bde755c2ca59"

const mockDaoFactory = () => {
  jest.spyOn(DaoFactory, "getDao").mockImplementation(() => {
    let dao = {};
    dao.createSchema = () => {};
    return dao;
  });
}

const mockSession = (userId) => {
  return {
    getIdentity: () => ({
      getUuIdentity: () => userId,
    }),
  };
}
 module.exports = {
  SHOPPING_LIST_CREATE,
   SHOPPING_LIST_UPDATE,
   SHOPPING_LIST_DELETE,
   SHOPPING_LIST_GET,
   SHOPPING_LIST_LIST,
   SHOPPING_LIST_ID,
   mockDaoFactory,
   mockSession,
 }
