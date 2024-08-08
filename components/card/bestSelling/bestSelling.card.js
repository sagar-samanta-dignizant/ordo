const BestSellingCard = ({ name, itemDescription, image, redirect }) => {
  return (
    <div className="best-selling-dish-card input-bg">
      <div className="best-selling-dish-info">
        <h5>{name}</h5>
        <div className="item-desc">{itemDescription}</div>
        <div className="item-price">
          <span className="old-price">€25</span> €20
        </div>
      </div>
      <figure>
        <img src={image} alt="" />
      </figure>
      <a href={redirect} className="stretched-link" />
    </div>
  );
};
export default BestSellingCard;
