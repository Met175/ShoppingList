import { useState, Utils } from "uu5g05";

const USERS = [
  { id: "123", name: "James" }, // owner
  { id: "234", name: "Amelia" }, //user
  { id: "345", name: "John" }, //user
  { id: "456", name: "Chloe" }, //user
];

// in pure react
// const UserContext = React.createContext();
// const useUserContext = () => React.useContext(UserContext);
const [UserContext, useUserContext] = Utils.Context.create([]);

function UserProvider({ children }) {
  const userParams = useState(USERS[0]);

  return (
    <UserContext.Provider value={userParams}>
      {children}
    </UserContext.Provider>
  );
}

function UserSelector() {
  const [user, setUser] = useUserContext();

  return (
    <select value={user.id} onChange={(e) => setUser(USERS.find(({ id }) => id === e.target.value))}>
      {USERS.map(({ id, name }) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  );
}

function useUser() {
  return useUserContext()[0];
}

/*
* Usage:
* ------
* <UserProvider>
*   ...
*     <UserSelector />
*   ...
*     <SomeComponent />
* </UserProvider>
*
* function SomeComponent() {
*   const user = useUser();
*   return ...;
* }
* */

export { UserProvider, UserSelector, useUser };
