import { createContext, useState } from 'react';

export const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <NotificationContext.Provider value={{ isActive, setIsActive }}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContextProvider;
