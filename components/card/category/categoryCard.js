import Link from 'next/link';

const CategoryCard = ({ categoryName, image, redirect, places }) => {
  return (
    <li className=''>
      <a className="search-list-card" onClick={()=>{redirect(categoryName)}}>
        <figure style={{minHeight:'110px'}}>
          <img src={image} className='search-list-card-image' alt="" />
          <figcaption>
            {categoryName} <span>{places && (`${places} places`)}</span>
          </figcaption>
        </figure>
      </a>
    </li>
  );
};
export default CategoryCard;
