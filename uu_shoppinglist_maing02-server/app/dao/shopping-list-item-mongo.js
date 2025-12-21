"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson");

class ShoppingListItemMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, name: 1 }, { unique: false });
    await super.createIndex({ awid: 1, toBuy: 1 }, { unique: false });
    await super.createIndex({ awid: 1, shoppingListId: 1 }, { unique: false });
  }

  async create(UuObject) {
    return super.insertOne(UuObject);
  }
  async get(awid, id) {
    return super.findOne({ awid, id });
  }
  async update(UuObject) {
    let filter = { awid: UuObject.awid, id: UuObject.id };
    return super.findOneAndUpdate(filter, UuObject, "NONE");
  }
  async delete(awid, id) {
    return super.deleteOne({ awid, id });
  }
  async list(awid, dtoIn, pageInfo, sort) {
    let filter = { awid };

    if (dtoIn.name) {
      filter.name = { $regex: dtoIn.name, $options: "i" };
    }
    if (dtoIn.shoppingListId) {
      filter.shoppingListId = dtoIn.shoppingListId;
    }
    if (dtoIn.idList && Array.isArray(dtoIn.idList)) {
      filter.id = { $in: dtoIn.idList.map((id) => new ObjectId(id)) };
    }
    if (dtoIn.toBuy !== undefined) {
      filter.toBuy = dtoIn.toBuy;
    }
    return super.find(filter, pageInfo, sort);
  }
}

module.exports = ShoppingListItemMongo;
