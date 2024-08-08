import { createContext, useState } from 'react';

export const MenuDineValueContext = createContext();

const MenuDineValueProvider = (props) => {
  const [menuDineValue, setMenuDineValue] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [initialValue, setInitialValue] = useState({});
  return (
    <MenuDineValueContext.Provider
      value={{
        menuDineValue,
        setMenuDineValue,
        totalAmount,
        setTotalAmount,
        initialValue,
        setInitialValue,
      }}
    >
      {props.children}
    </MenuDineValueContext.Provider>
  );
};
export default MenuDineValueProvider;
