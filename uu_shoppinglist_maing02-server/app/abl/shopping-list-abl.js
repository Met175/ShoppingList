"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/shopping-list-error.js");

const WARNINGS = {
  shoppingListCreateDtoInType: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  shoppingListUpdateDtoInType: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  shoppingListDeleteDtoInType: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
  shoppingListGetDtoInType: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  shoppingListListDtoInType: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class ShoppingListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shoppingList");
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListGetDtoInType.code,
      Errors.Get.InvalidDtoIn,
    );

    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.Get.ShoppingListDoesNotExist({ id: dtoIn.id });
    }

    return { ...shoppingList, uuAppErrorMap };
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListListDtoInType.code,
      Errors.List.InvalidDtoIn,
    );

    if (!dtoIn.pageInfo) {
      dtoIn.pageInfo = {
        pageIndex: 0,
        pageSize: 100,
      };
    }
    if (!dtoIn.sort) {
      dtoIn.sort = [{ name: "asc"}];
      }

    const listResult = await this.dao.list(awid, dtoIn, dtoIn.pageInfo, dtoIn.sort);
    return { itemList: listResult.itemList, pageInfo: listResult.pageInfo, uuAppErrorMap };
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate("shoppingListDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListDeleteDtoInType?.code,
      Errors.Delete.InvalidDtoIn,
    );
    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.Delete.ShoppingListDoesNotExist({ id: dtoIn.id });
    }
    await this.dao.delete(awid, dtoIn.id);

    let deleted = ``;
    const deletedList = await this.dao.get(awid, dtoIn.id);
    if (!deletedList) {
      deleted = "Success";
    }
    return { uuAppErrorMap, deleted };
  }

  async update(awid, dtoIn) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate("shoppingListUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListUpdateDtoInType?.code,
      Errors.Update.InvalidDtoIn,
    );
    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.Update.ShoppingListDoesNotExist({ id: dtoIn.id });
    }
    let updatedShoppingList = Object.assign(shoppingList, dtoIn);
    await this.dao.update(updatedShoppingList);

    return { uuAppErrorMap, shoppingList: updatedShoppingList };
  }

  async create(awid, dtoIn, session) {
    let uuAppErrorMap = {};
    const validationResult = this.validator.validate("shoppingListCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListCreateDtoInType?.code,
      Errors.Create.InvalidDtoIn,
    );
    let shoppingList = {
      awid,
      ...dtoIn,
      ownerUuId: session.getIdentity().getUuIdentity(),
      active: true,
      members: []
    };
    shoppingList = await this.dao.create(shoppingList);

    return { ...shoppingList, uuAppErrorMap };
  }
}

module.exports = new ShoppingListAbl();
