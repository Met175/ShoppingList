"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShoppingListItemMongo extends UuObjectDao {

  async createSchema(){
  }

}

module.exports = ShoppingListItemMongo;
