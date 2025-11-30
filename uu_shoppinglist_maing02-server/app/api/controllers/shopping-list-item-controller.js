"use strict";
const ShoppingListItemAbl = require("../../abl/shopping-list-item-abl.js");

class ShoppingListItemController {

  get(ucEnv) {
    return ShoppingListItemAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  list(ucEnv) {
    return ShoppingListItemAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  delete(ucEnv) {
    return ShoppingListItemAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  update(ucEnv) {
    return ShoppingListItemAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  create(ucEnv) {
    return ShoppingListItemAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }


}

module.exports = new ShoppingListItemController();
