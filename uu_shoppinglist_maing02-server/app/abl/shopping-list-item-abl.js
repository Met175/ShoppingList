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
  }
};

class ShoppingListItemAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shoppingListItem");
  }

  async get(awid, dtoIn, session) {
      let uuAppErrorMap = {};

      const validationResult = this.validator.validate("shoppingListItemGetDtoInType", dtoIn);
      uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        WARNINGS.shoppingListItemGetDtoInType?.code,
        Errors.Get.InvalidDtoIn
      );

      const item = await this.dao.get(awid, dtoIn.id);
      if (!item) {
        throw new Errors.Get.ShoppingListItemDoesNotExist();
      }

      return { ...item, uuAppErrorMap };
    }

  async list(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListItemListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListItemListDtoInType?.code,
      Errors.List.InvalidDtoIn
    );

    if (!dtoIn.pageInfo) {
      dtonIn.pageInfo = {
        pageIndex: 0,
        pageSize: 100
      };
    }

    const listResult = await this.dao.list(awid, dtoIn, dtoIn.pageInfo)
    return {itemList: listResult.itemList, pageInfo: listResult.pageInfo, uuAppErrorMap};
  }

  async delete(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListItemDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListItemDeleteDtoInType?.code,
      Errors.Delete.InvalidDtoIn
    );

    let item = await this.dao.delete(awid, dtoIn.id);
    if (!item) {
      throw new Errors.Delete.ShoppingListItemDoesNotExist();
    }

    return { uuAppErrorMap };
  }

  async update(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListItemUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListItemUpdateDtoInType?.code,
      Errors.Update.InvalidDtoIn
    );

    let item = await this.dao.get(awid, dtoIn.id);
    if (!item) {
      throw new Errors.Update.ShoppingListItemDoesNotExist();
    }

    if (dtoIn.shoppingListId) {
      const list = await this.shoppingListDao.get(awid, dtoIn.shoppingListId);
      if (!list) {
        throw new Errors.Update.ShoppingListDoesNotExist();
      }
    }

    const updated = await this.dao.update({ ...item, ...dtoIn });

    return { ...updated, uuAppErrorMap };
  }

  async create(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListItemCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListItemCreateDtoInType?.code,
      Errors.Create.InvalidDtoIn
    );

    const list = await this.shoppingListDao.get(awid, dtoIn.shoppingListId);
    if (!list) {
      throw new Errors.Create.ShoppingListDoesNotExist();
    }

    const item = await this.dao.create({
      awid,
      ...dtoIn
    });

    return { ...item, uuAppErrorMap };
  }


}

module.exports = new ShoppingListItemAbl();
