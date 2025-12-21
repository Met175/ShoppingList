const shoppingListItemCreateDtoInType = shape({
  shoppingListId: id().isRequired(),
  name: string(1, 20).isRequired()
});

const shoppingListItemUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(1, 20),
  toBuy: boolean(),
});

const shoppingListItemListDtoInType = shape({
  idList: array(id(), 0, 50),
  toBuy: boolean(),
  shoppingListId: id().isRequired(),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  }),
  sortBy: oneOf(["name", "createTs"]),
  order: oneOf(["asc", "desc"]),
});

const shoppingListItemDeleteDtoInType = shape({
  id: id().isRequired()
});
const shoppingListItemGetDtoInType = shape({
  id: id().isRequired()
});
