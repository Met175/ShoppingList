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
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  shoppingListDeleteDtoInType: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  shoppingListGetDtoInType: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  shoppingListListDtoInType: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  shoppingListAddMemberDtoInType: {
    code: `${Errors.AddMember.UC_CODE}unsupportedKeys`,
  },
  shoppingListRemoveMemberDtoInType: {
    code: `${Errors.RemoveMember.UC_CODE}unsupportedKeys`,
  },
  shoppingListListMemberDtoInType: {
    code: `${Errors.ListMember.UC_CODE}unsupportedKeys`,
  },

};

class ShoppingListAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shoppingList");
  }

  async listMember(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListListMemberDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListListMemberDtoInType.code,
      Errors.ListMember.InvalidDtoIn
    );

    const shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.ListMember.ShoppingListDoesNotExist();
    }

  return {uuAppErrorMap};
  }

  async removeMember(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListRemoveMemberDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListRemoveMemberDtoInType.code,
      Errors.RemoveMember.InvalidDtoIn
    );

    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.RemoveMember.ShoppingListDoesNotExist();
    }
    return {uuAppErrorMap};
  }

  async addMember(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListAddMemberDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListAddMemberDtoInType.code,
      Errors.AddMember.InvalidDtoIn
    );

    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.AddMember.ShoppingListDoesNotExist();
    }

    return {uuAppErrorMap};
  }

  async get(awid, dtoIn, session) {
      let uuAppErrorMap = {};

      const validationResult = this.validator.validate("shoppingListGetDtoInType", dtoIn);
      uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        WARNINGS.shoppingListGetDtoInType.code,
        Errors.Get.InvalidDtoIn
      );

      let shoppingList = await this.dao.get(awid, dtoIn.id);
      if (!shoppingList) {
        throw new Errors.Get.ShoppingListDoesNotExist();
      }

      return { ...shoppingList, uuAppErrorMap };
  }

  async list(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("shoppingListListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListListDtoInType.code,
      Errors.AddMember.InvalidDtoIn
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
    let uuAppErrorMap = {}
    const validationResult = this.validator.validate("shoppingListDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListDeleteDtoInType?.code,
      Errors.Create.InvalidDtoIn
    )
    let shoppingList = await this.dao.delete(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.Delete.ShoppingListDoesNotExist();
    }

    return {uuAppErrorMap};
  }

  async update(awid, dtoIn, session) {
    let uuAppErrorMap = {}
    const validationResult = this.validator.validate("shoppingListUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListUpdateDtoInType?.code,
      Errors.Create.InvalidDtoIn
    )
    let shoppingList = await this.dao.update(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.Update.ShoppingListDoesNotExist();
    }

    return {uuAppErrorMap};

  }

  async create(awid, dtoIn, session) {
    let uuAppErrorMap = {}
    const validationResult = this.validator.validate("shoppingListCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.shoppingListCreateDtoInType?.code,
      Errors.Create.InvalidDtoIn
    )
    const shoppingList = await this.dao.create({ awid, ...dtoIn });

    return { ...shoppingList, uuAppErrorMap };
  }

}

module.exports = new ShoppingListAbl();
