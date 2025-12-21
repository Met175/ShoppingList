"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("bson")

class ShoppingListMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, title: 1 }, { unique: false });
    await super.createIndex({ awid: 1, ownerUuId: 1 }, { unique: false });
    await super.createIndex({ awid: 1, members: 1 }, { unique: false });
    await super.createIndex({ awid: 1, active: 1 }, { unique: false });
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

    if (dtoIn.title) {
      filter.title = { $regex: dtoIn.title, $options: "i" };
    }
    if (dtoIn.idList && Array.isArray(dtoIn.idList)) {
      filter.id = { $in: dtoIn.idList.map((id) => new ObjectId(id))};
    }
    if (dtoIn.memberIdList && Array.isArray(dtoIn.memberIdList)) {
      filter.members = { $in: dtoIn.memberIdList };
    }
    if (dtoIn.ownerUuId) filter.ownerUuId = dtoIn.ownerUuId;

    if (dtoIn.active !== undefined) {
      filter.active = dtoIn.active;
    }
    return super.find(filter, pageInfo, sort);
  }
}

module.exports = ShoppingListMongo;
