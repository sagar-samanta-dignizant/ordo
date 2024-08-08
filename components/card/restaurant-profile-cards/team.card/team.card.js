const TeamCard = ({ name, designation, experience, image }) => {
  return (
    <div className="team-slide-card">
      <figure>
        <img src={image} alt="" />
      </figure>
      <div>
        <h3 className="mb-6">{name}</h3>
        <div className="type m-0">
          <ul>
            <li className="font-14px-20px-400 text-content">{designation}</li>
            <li className="font-14px-20px-400 text-content">{experience}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TeamCard;
