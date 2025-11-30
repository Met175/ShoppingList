const shoppingListCreateDtoInType = shape({
  title: string(1, 20).isRequired()
});

const shoppingListUpdateDtoInType = shape({
  id: id().isRequired(),
  title: string(1, 20),
  active: boolean()
});

const shoppingListDeleteDtoInType = shape({
  id: id().isRequired()
});
const shoppingListGetDtoInType = shape({
  id: id().isRequired()
});
const shoppingListListDtoInType = shape({
  idList: array(id(), 0, 10),
  active: boolean(),
  pageInfo: shape({
    pageIndex: integer(0, null),
    pageSize: integer(1, 100)
  }),
  memberIdList: array(uuIdentity(), 0, 10)
});


const shoppingListAddMemberDtoInType = shape({
  id: id().isRequired(),
  member: array(uuIdentity()).isRequired()
});

const shoppingListRemoveMemberDtoInType = shape({
  id: id().isRequired(),
  member: array(uuIdentity()).isRequired()
});

const shoppingListListMemberDtoInType = shape({
  id: id().isRequired()
});
