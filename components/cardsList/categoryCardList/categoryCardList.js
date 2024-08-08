import CategoryCard from "../../card/category/categoryCard";

const CategoryCardList = ({ data, onClick }) => {
	return (
		<div className="browse-categories-list">
			{data.map(({ _id, n_places }, key) => (
				<CategoryCard
					key={key}
					categoryName={_id}
					image={`/assets/images/search-menu/cuisines/${_id?.replace(/ /g, "")}.png`}
					redirect={onClick}
					places={n_places}
				/>
			))}
		</div>
	);
};
export default CategoryCardList;
