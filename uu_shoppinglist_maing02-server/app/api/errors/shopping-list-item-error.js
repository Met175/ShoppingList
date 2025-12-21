"use strict";

const ShoppinglistMainUseCaseError = require("./shoppinglist-main-use-case-error.js");
const SHOPPING_LIST_ITEM_ERROR_PREFIX = `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppingListItem/`;



const Create = {
  UC_CODE: `${SHOPPING_LIST_ITEM_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`
    }
  },
  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}shoppingListDoesNotExist`;
      this.message = `Shopping list does not exist.`
    }}
};

const Update = {
  UC_CODE: `${SHOPPING_LIST_ITEM_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ShoppingListItemDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shoppingListItemDoesNotExist`;
      this.message = "Shopping list item does not exist.";
    }
  }
};

const Delete = {
  UC_CODE: `${SHOPPING_LIST_ITEM_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ShoppingListItemDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}shoppingListItemDoesNotExist`;
      this.message = "Shopping list item does not exist.";
    }
  }
};

const List = {
    UC_CODE: `${SHOPPING_LIST_ITEM_ERROR_PREFIX}list/`,
    InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${List.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    }
  };

const Get = {
  UC_CODE: `${SHOPPING_LIST_ITEM_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ShoppingListItemDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}shoppingListItemDoesNotExist`;
      this.message = "Shopping list item does not exist.";
    }
  }
};

module.exports = {
  Get,
  List,
  Delete,
  Update,
  Create,
};
