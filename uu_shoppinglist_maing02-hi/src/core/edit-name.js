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

const EditName = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddItemButton",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render( {listName, setListName, user} ) {
    //@@viewOn:private
    const [editNameModalOpen, setEditNameModalOpen] = useState(false);

    if (user.id !== "123") return null;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Icon icon="uugds-edit-inline" onClick={() => setEditNameModalOpen(true)} />

        {editNameModalOpen && (
          <Uu5Forms.Form.Provider
            onSubmit={(e) => {
              const data = e.data.value;
              setListName(data.newName);
              setEditNameModalOpen(false);
            }}
          >
            <Uu5Elements.Modal
              open={editNameModalOpen}
              onClose={() => setEditNameModalOpen(false)}
              header="Edit List Name"
              colorScheme="pink"
              footer={
                <Uu5Forms.SubmitButton colorScheme="pink" significance="highlighted">
                  Edit
                </Uu5Forms.SubmitButton>
              }
            >
              <Uu5Forms.Form.View>
                <Uu5Forms.FormText name="newName" label="New Name" required />
              </Uu5Forms.Form.View>
            </Uu5Elements.Modal>
          </Uu5Forms.Form.Provider>
        )}
      </div>

      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { EditName };
export default EditName;
//@@viewOff:exports
