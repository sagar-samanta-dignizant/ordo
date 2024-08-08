const createServiceProviderData = (data) => {
  const menuGroup = [];
  const dataSorting = () => {
    data.map((item) => {
      if (menuGroup.length !== -1) {
        if (
          item.MenuGroupName &&
          menuGroup.find((ele) => ele.name === item.MenuGroupName) === undefined
        ) {
          menuGroup.push({
            code: item.MenuCode,
            name: item.MenuGroupName,
            type: "group",
          });
        }
      } else {
        menuGroup.push({
          code: item.MenuCode,
          name: item.MenuGroupName,
          type: "group",
        });
      }
    });
    
  };
  const createMainData = () => {
    data.map((item) => {
      menuGroup.map((ele, ind) => {
        if (item.MenuGroupName === ele.name) {
          if (
            item.MenuCategoryName === item.MenuGroupName &&
            !menuGroup[ind].fields
          ) {
            menuGroup[ind] = {
              ...ele,
              fields: [{ ...item, type: "product" }],
              hasCategory: false,
            };
          } else if (
            item.MenuCategoryName === item.MenuGroupName &&
            menuGroup[ind].fields
          ) {
            menuGroup[ind].fields.push({ ...item, type: "product" });
          } else if (
            item.MenuCategoryName !== item.MenuGroupName &&
            !menuGroup[ind].fields
          ) {
            menuGroup[ind] = {
              ...ele,
              fields: [
                {
                  categoryCode: item.CategoryCode,
                  categoryName: item.MenuCategoryName,
                  type: "category",
                },
              ],
              hasCategory: true,
            };
          } else if (
            item.MenuCategoryName !== item.MenuGroupName &&
            menuGroup[ind].fields
          ) {
            if (
              menuGroup[ind].fields.find(
                (el) => el.categoryName === item.MenuCategoryName
              ) === undefined
            ) {
              menuGroup[ind].fields.push({
                categoryCode: item.CategoryCode,
                categoryName: item.MenuCategoryName,
                type: "category",
              });
            }
          }
        }
      });
    });
    data.map((item) => {
      menuGroup.map((ele) => {
        if (ele.hasCategory === true) {
          ele.fields.map((category, index) => {
            if (
              category.categoryName === item.MenuCategoryName &&
              !category.fields
            ) {
              ele.fields[index] = {
                ...category,
                fields: [{ ...item, type: "product" }],
              };
            } else if (
              category.categoryName === item.MenuCategoryName &&
              category.fields
            ) {
              ele.fields[index].fields.push({ ...item, type: "product" });
            }
          });
        }
      });
    });
  };
  dataSorting();
  createMainData();

  return menuGroup;
};
export default createServiceProviderData;
