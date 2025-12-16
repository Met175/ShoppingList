import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  call(method, url, dtoIn, clientOptions) {
    return Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("cmdGet", commandUri, dtoIn);
  // },
shoppingListList(dtoIn) {
    console.log("CALLED")
    const commandUri = Calls.getCommandUri("shoppingList/list");
    const dtoOut = Calls.call("cmdGet", commandUri, dtoIn);
    console.log("shoppingListList called", dtoOut);
    return dtoOut;
  },

  shoppingListCreate(dtoIn) {
    const commandUri = Calls.getCommandUri("shoppingList/create");
    return Calls.call("cmdPost", commandUri, dtoIn);
  },

  shoppingListDelete(dtoIn) {
    const commandUri = Calls.getCommandUri("shoppingList/delete");
    return Calls.call("cmdPost", commandUri, dtoIn);
  },

  shoppingListUpdate(dtoIn) {
    const commandUri = Calls.getCommandUri("shoppingList/update");
    return Calls.call("cmdPost", commandUri, dtoIn);
  },
  /*
  addMember(dtoIn) {
    const commandUri = Calls.getCommandUri("shoppingList/addMember");
    return Calls.call("cmdPost", commandUri, dtoIn);
  },
  deleteMember(dtoIn) {
    const commandUri = Calls.getCommandUri("shoppingList/deleteMember");
    return Calls.call("cmdPost", commandUri, dtoIn);
  },
  listMembers(dtoIn) {
    const commandUri = Calls.getCommandUri("shoppingList/listMembers");
    return Calls.call("cmdGet", commandUri, dtoIn);
  },
  */
  itemList(dtoIn) {
    const commandUri = Calls.getCommandUri("item/list");
    return Calls.call("cmdGet", commandUri, dtoIn);
  },

  itemCreate(dtoIn) {
    const commandUri = Calls.getCommandUri("item/create");
    return Calls.call("cmdPost", commandUri, dtoIn);
  },

  itemDelete(dtoIn) {
    const commandUri = Calls.getCommandUri("item/delete");
    return Calls.call("cmdPost", commandUri, dtoIn);
  },

  itemUpdate(dtoIn) {
    const commandUri = Calls.getCommandUri("item/update");
    return Calls.call("cmdPost", commandUri, dtoIn);
  },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("cmdGet", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("cmdPost", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("cmdGet", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
