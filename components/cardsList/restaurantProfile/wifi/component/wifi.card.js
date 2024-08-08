const WifiCard = ({ image, userName, name, backroundColor='#E1EFEE' }) => {
  return (
    <div className="card-content mb-20">
      <figure className="card-content-img" style={{ background: backroundColor }}>
        <img src={image} alt="" />
        
      </figure>
      <div className="card-content-info"  style={{height:"40px"}} >
        <p className="font-14px-20px-400">{userName}</p>
        <h5>{name}</h5>
      </div>
      
    </div> 
  );
};
export default WifiCard;
