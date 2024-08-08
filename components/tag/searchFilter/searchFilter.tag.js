/* eslint-disable @next/next/no-img-element */

const SearchFilterTag = ({ name, image, isActive, redirect, onDelete }) => {
  return (
    <li className={` search-filter-tag ${isActive ? 'active' : ''}`}>
      <a href={redirect} className="font-14px-20px-500 shadow-none">
        {name}
        <i onClick={()=>{onDelete()}}>
          <img src={image} alt={image} />
        </i>
      </a>
    </li>
  );
};
export default SearchFilterTag;
