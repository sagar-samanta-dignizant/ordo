const ProfileSetupItem = ({ image, heading, paragraph, redirect }) => {
  return (
    <div className="card">
      <div className="card-content">
        <figure
          className="card-content-img"
          style={{ background: 'rgba(234, 67, 53, 0.1)' }}
        >
          <img src={image} alt="" />
        </figure>
        <div className="card-content-info">
          <h5>{heading}</h5>
          <p className="footnote-400">{paragraph}</p>
        </div>
        <div className="card-content-arrow">
          <img src="/assets/images/icons/card-content-arrow.svg" alt="" />
        </div>
        <a href={redirect} className="stretched-link" />
      </div>
    </div>
  );
};
export default ProfileSetupItem;
