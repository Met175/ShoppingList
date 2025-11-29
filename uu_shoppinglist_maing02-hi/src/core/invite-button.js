//@@viewOn:imports
import Uu5, { createVisualComponent, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import Uu5Forms from "uu5g05-forms";


//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const InviteButton = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InviteButton",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {

  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ members, setMembers, user }) {
    //@@viewOn:private
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    if (user.id !== "123") return null;
    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Button
            colorScheme="purple"
            borderRadius="full"
            significance="highlighted"
            icon="uugds-plus"
            onClick={() => setInviteModalOpen(true)}

        >
            Invite
          </Uu5Elements.Button>

        {inviteModalOpen && (
          <Uu5Forms.Form.Provider onSubmit={(e) => {
            const data = e.data.value;
            setMembers([...members, { id: members.length + 1, ...data }]);
            setInviteModalOpen(false);
          }}
          >
            <Uu5Elements.Modal open={inviteModalOpen} onClose={() => setInviteModalOpen(false)} header="Invite people" colorScheme="pink"
              footer={<Uu5Forms.SubmitButton colorScheme="pink" significance="highlighted" >Send Invite</Uu5Forms.SubmitButton>}
            >
              <Uu5Forms.Form.View>
                <Uu5Forms.FormText name="name" label="Name" required />
                <Uu5Forms.FormText name="email" label="Email" required />
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
export { InviteButton };
export default InviteButton;
//@@viewOff:exports
