//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute, useState } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
import AddItemButton from "./add-item-button.js";
import EditName from "./edit-name.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListItemsForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListItemsForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ items, setItems, filterItems, user }) {
    //@@viewOn:private
    const filteredItems = items.filter((item) => {
      if (filterItems === "toBuy") return item.toBuy === true;
      if (filterItems === "bought") return item.toBuy === false;
      return true; // all
    });

    const [listName, setListName] = useState("Shopping List #1");

    const handleCheckboxChange = (itemId) => {
      setItems(items.map((item) => (item.id === itemId ? { ...item, toBuy: !item.toBuy } : item)));
    };
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Block
          card="content"
          colorScheme="red"
          significance="distinct"
          header={
            <Uu5Elements.Header
              title={
                <Uu5Elements.Text category="interface" segment="title" type="major">
                  {listName}
                </Uu5Elements.Text>
              }
              icon={<EditName listName={listName} setListName={setListName} user={user} />}

            />
          }
          headerSeparator={true}
          backgroundColor="pink"
          footer={<AddItemButton items={items} setItems={setItems} />}
        >
          <Uu5Elements.Grid>
            {filteredItems
              .slice()
              .sort((a, b) => {
                if (a.toBuy === b.toBuy) {
                  return a.name.localeCompare(b.name);
                }
                return a.toBuy ? -1 : 1; // toBuy items first
              })
              .map((item) => (
              <Uu5Elements.ListItem
                key={item.id}
                actionList={[
                  {
                    icon: "uugds-close",
                    onClick: () => {
                      setItems(items.filter((i) => i.id !== item.id));
                    },
                  },
                ]}
              >

                {item.toBuy ? (
                  <Uu5Forms.Checkbox
                    label={item.name}
                    colorScheme="pink"
                    box={false}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                ) : (
                  <Uu5Elements.Box significance="subdued" shape="interactiveElement">{item.name}</Uu5Elements.Box>

                )}

              </Uu5Elements.ListItem>
            ))}
          </Uu5Elements.Grid>
        </Uu5Elements.Block>
      </div>

      //@@viewOff:render
    );
  },
});

//@@viewOn:exports
export { ShoppingListItemsForm };
export default ShoppingListItemsForm;
//@@viewOff:exports

// <Uu5Forms.Checkbox borderRadius="expressive" colorScheme="pink" key={item.id} label={item.name} />;
