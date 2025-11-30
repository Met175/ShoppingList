"use strict";

const ShoppinglistMainUseCaseError = require("./shoppinglist-main-use-case-error.js");
const SHOPPING_LIST_ERROR_PREFIX = `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppingList/`;

const Create = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`
    }
  }
};

const Update = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}update/`,
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

const Delete = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}delete/`,
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

const List = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};


const Get = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}shoppingListDoesNotExist`;
      this.message = `Shopping list does not exist.`;
    }
  }
};

const AddMember = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}addMember/`,
  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}shoppingListDoesNotExist`;
      this.message = `Shopping list does not exist.`;
    }
  }
};

const RemoveMember = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}removeMember/`,
  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}shoppingListDoesNotExist`;
      this.message = `Shopping list does not exist.`;
    }
  }
};

const ListMember = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}listMember/`,
  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListMember.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListMember.UC_CODE}shoppingListDoesNotExist`;
      this.message = `Shopping list does not exist.`;
    }
  }
};

module.exports = {
  ListMember,
  RemoveMember,
  AddMember,
  Get,
  List,
  Delete,
  Update,
  Create
};
