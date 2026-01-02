//@@viewOn:imports
import { createVisualComponent, Lsi, useState } from "uu5g05";
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

const AddListButton = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddListButton",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ shoppingLists, setShoppingLists, user }) {
    //@@viewOn:private
    const [addListModalOpen, setAddListModalOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Button
          colorScheme="purple"
          borderRadius="full"
          significance="highlighted"
          icon="uugds-plus"
          onClick={() => setAddListModalOpen(true)}
        >
          <Lsi lsi={{ cs: "Přidat Seznam", en: "Add List" }} />
        </Uu5Elements.Button>

        {addListModalOpen && (
          <Uu5Forms.Form.Provider
            onSubmit={(e) => {
              const data = e.data.value;
              setShoppingLists((prev) => [
                ...prev,
                { id: Date.now(), name: data.name, owner: user.name, members: [], active: true }
              ]);
              setAddListModalOpen(false);
            }}
          >
            <Uu5Elements.Modal
              open={addListModalOpen}
              onClose={() => setAddListModalOpen(false)}
              header={<Lsi lsi={{ cs: "Přidat Seznam", en: "Add List" }} />}
              colorScheme="pink"
              footer={
                <Uu5Forms.SubmitButton colorScheme="pink" significance="highlighted">
                  <Lsi lsi={{ cs: "Přidat Nový Seznam", en: "Add New List" }} />
                </Uu5Forms.SubmitButton>
              }
            >
              <Uu5Forms.Form.View>
                <Uu5Forms.FormText name="name" label={<Lsi lsi={{ cs: "Název", en: "Name" }} />} required />
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
export { AddListButton };
export default AddListButton;
//@@viewOff:exports
