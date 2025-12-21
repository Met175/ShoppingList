const shoppingListCreateDtoInType = shape({
  title: string(1, 20).isRequired(),
  members: array(uuIdentity(), 0, 10)

});

const shoppingListUpdateDtoInType = shape({
  id: id().isRequired(),
  title: string(1, 20),
  active: boolean(),
  members: array(uuIdentity(), 0, 10)
});

const shoppingListDeleteDtoInType = shape({
  id: id().isRequired()
});
const shoppingListGetDtoInType = shape({
  id: id().isRequired()
});
const shoppingListListDtoInType = shape({
  idList: array(id(), 0, 10),
  title: string(1, 20),
  active: boolean(),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  }),
  sortBy: oneOf(["title", "createTs"]),
  order: oneOf(["asc", "desc"]),
  ownerUuId : uuIdentity(),
  memberIdList: array(uuIdentity(), 0, 10)
});
