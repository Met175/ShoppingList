//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute, useState } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import AddItemButton from "./add-item-button.js";
import EditName from "./edit-name.js";
import ShoppingListTile from "./shopping-list-tile.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ shoppingLists, setShoppingLists, user, filterLists }) {
    console.log("ShoppingListList render", shoppingLists);

    const filteredData = shoppingLists.filter((list) => {
      // filtr podle active/archived
      if (filterLists === "active" && !list.active) return false;
      if (filterLists === "archived" && list.active) return false;

      // filtr podle uživatele
      if (list.owner === user.name) return true;
      if (list.members && list.members.includes(user.name)) return true;

      return false;
    });
    console.log(user.name)
    console.log(shoppingLists.owner)

    const handleArchive = (shoppingListId) => {
      setShoppingLists(
        shoppingLists.map((shoppingList) =>
          shoppingList.id === shoppingListId
            ? { ...shoppingList, active: !shoppingList.active }
            : shoppingList
        )
      );
    };

    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <Uu5Tiles.ControllerProvider data={filteredData}>
          <Uu5TilesElements.Grid tileMinWidth={100} tileMaxWidth={600}>
            {( tile ) => <ShoppingListTile shoppingLists = {shoppingLists} shoppingList={tile.data} handleArchive={handleArchive} setShoppingLists={setShoppingLists} user={user}/>}
          </Uu5TilesElements.Grid>
        </Uu5Tiles.ControllerProvider>
      </div>

      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { ShoppingListList };
export default ShoppingListList;
//@@viewOff:exports

