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

const AddItemButton = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddItemButton",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ items, setItems }) {
    //@@viewOn:private
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Button
          colorScheme="purple"
          borderRadius="full"
          significance="highlighted"
          icon="uugds-plus"
          onClick={() => setAddItemModalOpen(true)}
        >
          Add Item
        </Uu5Elements.Button>

        {addItemModalOpen && (
          <Uu5Forms.Form.Provider
            onSubmit={(e) => {
              const data = e.data.value;
              setItems((prev) => [...prev, { id: Date.now(), toBuy: true, ...data }]);
              setAddItemModalOpen(false);
            }}
          >
            <Uu5Elements.Modal
              open={addItemModalOpen}
              onClose={() => setAddItemModalOpen(false)}
              header="Add Item"
              colorScheme="pink"
              footer={
                <Uu5Forms.SubmitButton colorScheme="pink" significance="highlighted">
                  Add Item
                </Uu5Forms.SubmitButton>
              }
            >
              <Uu5Forms.Form.View>
                <Uu5Forms.FormText name="name" label="Name" required />
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
export { AddItemButton };
export default AddItemButton;
//@@viewOff:exports
