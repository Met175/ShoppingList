//@@viewOn:imports
import { createVisualComponent, useState } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DeleteListDialog = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DeleteListDialog",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ shoppingList, open, onClose, shoppingLists, setShoppingLists }) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Elements.Dialog
        open = {open}
        onClose = {onClose}
        actionList={[{ children: "Delete" , colorScheme: "negative", significance: "highlighted",
          onClick: () => setShoppingLists(shoppingLists.filter((i) => i.id !== shoppingList.id)) },
          { children: "Cancel" }]}
        header={`Delete ${shoppingList.name}`}
        icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
        info={`Do you really want to delete ${shoppingList.name}?`
        }
        actionDirection="horizontal"
      />


      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { DeleteListDialog };
export default DeleteListDialog;
//@@viewOff:exports
