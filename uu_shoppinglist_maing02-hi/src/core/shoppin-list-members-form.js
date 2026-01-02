//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute, useState } from "uu5g05";
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

const ShoppingListMembersForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListMembersForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ members, setMembers, user }) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Block
          card="content"
          colorScheme="red"
          significance="distinct"
          header={
            <Uu5Elements.Text category="interface" segment="title" type="major">
              {<Lsi lsi={{ cs: "Členové", en: "Members" }} />}
            </Uu5Elements.Text>
          }
          headerSeparator={true}
          backgroundColor="pink"
        >
          <Uu5Elements.Grid>
            {members.map((member) => (
              <Uu5Elements.ListItem
                key={member.id}
                actionList={
                  user.id === "123"
                    ? [
                        {
                          icon: "uugds-close",
                          onClick: () => setMembers(members.filter((i) => i.id !== member.id)),
                        },
                      ]
                    : []
                }
              >
                {member.email}
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
export { ShoppingListMembersForm };
export default ShoppingListMembersForm;
//@@viewOff:exports

