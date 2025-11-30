const shoppingListItemCreateDtoInType = shape({
  shoppingListId: id().isRequired(),
  name: string(1, 20).isRequired()
});

const shoppingListItemUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(1, 20),
  toBuy: boolean(),
  shoppingListId: id().isRequired()
});

const shoppingListItemListDtoInType = shape({
  idList: array(id(), 0, 50),
  toBuy: boolean(),
  shoppingListId: id().isRequired(),
  pageInfo: shape({
    pageIndex: integer(0, null),
    pageSize: integer(1, 100)
  })
});

const shoppingListItemDeleteDtoInType = shape({
  id: id().isRequired()
});
const shoppingListItemGetDtoInType = shape({
  id: id().isRequired()
});
