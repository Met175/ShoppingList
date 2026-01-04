"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/shopping-list-item-error.js");

const WARNINGS = {
  shoppingListItemCreateDtoInType: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  shoppingListItemUpdateDtoInType: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  shoppingListItemDeleteDtoInType: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
  shoppingListItemGetDtoInType: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  shoppingListItemListDtoInType: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class ShoppingListItemAbl {
  constructor() {
    this.validator = Validator.load();
    this.shoppingListItemDao = DaoFactory.getDao("shoppingListItem");
    this.shoppingListDao = DaoFactory.getDao("shoppingList");
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListItemGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListItemGetDtoInType?.code,
      Errors.Get.InvalidDtoIn,
    );

    const item = await this.shoppingListItemDao.get(awid, dtoIn.id);
    if (!item) {
      throw new Errors.Get.ShoppingListItemDoesNotExist({ id: dtoIn.id });
    }

    return { ...item, uuAppErrorMap };
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListItemListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListItemListDtoInType?.code,
      Errors.List.InvalidDtoIn,
    );

    if (!dtoIn.pageInfo) {
      dtoIn.pageInfo = {
        pageIndex: 0,
        pageSize: 100,
      };
    }
    if (!dtoIn.sort) {
      dtoIn.sort = [{ name: "asc" }];
    }

    const listResult = await this.shoppingListItemDao.list(awid, dtoIn, dtoIn.pageInfo, dtoIn.sort);
    return { itemList: listResult.itemList, pageInfo: listResult.pageInfo, uuAppErrorMap };
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListItemDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListItemDeleteDtoInType?.code,
      Errors.Delete.InvalidDtoIn,
    );
    let item = await this.shoppingListItemDao.get(awid, dtoIn.id);
    if (!item) {
      throw new Errors.Delete.ShoppingListItemDoesNotExist({ id: dtoIn.id });
    }
    await this.shoppingListItemDao.delete(awid, dtoIn.id);

    return { uuAppErrorMap };
  }

  async update(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListItemUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListItemUpdateDtoInType?.code,
      Errors.Update.InvalidDtoIn,
    );

    let item = await this.shoppingListItemDao.get(awid, dtoIn.id);
    if (!item) {
      throw new Errors.Update.ShoppingListItemDoesNotExist({ id: dtoIn.id });
    }

    const updated = await this.shoppingListItemDao.update({ ...item, ...dtoIn });

    return { ...updated, uuAppErrorMap };
  }

  async create(awid, dtoIn) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListItemCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListItemCreateDtoInType?.code,
      Errors.Create.InvalidDtoIn,
    );

    let shoppingList = await this.shoppingListDao.get(awid, dtoIn.shoppingListId);
    if (!shoppingList) {
      throw new Errors.Create.ShoppingListDoesNotExist({ id: dtoIn.shoppingListId });
    }

    const item = await this.shoppingListItemDao.create({
      awid,
      ...dtoIn,
      toBuy: true,
    });

    return { ...item, uuAppErrorMap };
  }
}

module.exports = new ShoppingListItemAbl();
