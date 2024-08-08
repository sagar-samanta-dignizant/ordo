import MenuListItemComponent from '@/components/sections/menu-dine-in/component/menuListItem.component';

const MenuListItem = ({
  menuGroup,
  showModal,
  setSelectedMenu,
  setShowModal,
  selectedMenu,
}) => {
  return (
    <div className="menulist-item" style={{ marginTop: '30px' }}>
      <ul id="menulist_item">
        {menuGroup.map(({ code, name, hasCategory, fields }) => {
          return (
            <MenuListItemComponent
              code={code}
              name={name}
              hasCategory={hasCategory}
              key={code}
              showModal={showModal}
              setShowModal={setShowModal}
              fields={fields}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default MenuListItem;
