import { createContext, useState } from "react";

export const UserContext = createContext();
const UserContextProvider = (props) => {
	const [open, setOpen] = useState(false);
	const [openCurrentLocation, setOpenCurrentLocation] = useState(false);
	const [openFilterModal, setOpenFilterModal] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [activeFilters, setActiveFilters] = useState([]);
	const [openInfo, setOpenInfo] = useState(false);

	return (
		<UserContext.Provider
			value={{
				open,
				setOpen,
				openFilterModal,
				setOpenFilterModal,
				openCurrentLocation,
				setOpenCurrentLocation,
				searchText,
				setSearchText,
				activeFilters,
				setActiveFilters,
				openInfo,
				setOpenInfo,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};
export default UserContextProvider;
