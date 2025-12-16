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

  render({ dataList, user, filterLists }) {
    console.log("ShoppingListList render", dataList);
    const { data, state, errorData } = dataList;
    if (state === "pending" || state === "pendingNoData") {
      return <div>Loading shopping lists...</div>;
    }

    if (state === "error") {
      return <div>Error loading shopping lists</div>;
    }
    const shoppingLists = data ?? [];
    console.log("shoppingLists:", shoppingLists);
    const filteredData = shoppingLists
      .map((list) => list.data)
      .filter((list) => {
        // filter active/archived
        if (filterLists === "active" && !list.active) return false;
        if (filterLists === "archived" && list.active) return false;

        // filter by user
        if (list.owner === user.name) return true;
        if (list.members && list.members.includes(user.name)) return true;

        return false;
      });
    console.log("filteredData:", filteredData);
    console.log(user.name);
    console.log(shoppingLists.owner);
    const handleArchive = async (shoppingListId) => {
      try {
        const listToUpdate = dataList.data.find((list) => list.data.id === shoppingListId);
        if (!listToUpdate) {
          console.log("id not found:", shoppingListId);
          return;
        }

        const updatedList = { ...listToUpdate.data, active: !listToUpdate.data.active };

        await dataList.handlerMap.update(updatedList);

        // Optional: refresh the list
      } catch (error) {
        console.error("Failed to archive/unarchive shopping list:", error);
      }
    };
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <Uu5Tiles.ControllerProvider data={filteredData}>
          <Uu5TilesElements.Grid tileMinWidth={100} tileMaxWidth={600}>
            {(tile) => <ShoppingListTile shoppingList={tile.data} user={user} handleArchive={handleArchive} />}
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
