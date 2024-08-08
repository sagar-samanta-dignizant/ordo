const PeopleAddedItem = ({ name, price, image }) => {
  return (
    <div className="add-items-card">
      <figure className="mr-12">
        <img src={image} alt="" />
      </figure>
      <div className="add-items-info">
        <h5>{name}</h5>
        <span className="font-14px-20px-400">€{price.toLocaleString('en-US')}</span>
      </div>
      <div className="plus-minus-count align-self-end">
        <span className="qty qty-minus">
          <img src="/assets/images/company-details/minus.svg" alt="" />
        </span>
        <input type="numeric" defaultValue={1} />
        <span className="qty qty-plus">
          <img src="/assets/images/company-details/plus.svg" alt="" />
        </span>
      </div>
    </div>
  );
};
export default PeopleAddedItem;
