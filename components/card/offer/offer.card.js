import RoundedButton from "/components/button/roundedButton.js";
import Link from "next/link";
import Image from "next/image";

const OfferCard = ({
  image,
  heading,
  paragraph,
  btnName,
  btnRedirect,
  cardRedirect,
  btnClassName,
  color,
}) => {
  return (
    <div className="rest-offer-card" style={{ backgroundColor: color }}>
      <div className="cardsImageContainer">
        {/* <Image src={image} alt={image} height={'100%'} width={160}/> */}
        <Image
          src={image ? image : ""}
          alt={image ? image : ""}
          width={150}
          height={186}
          objectFit="contain"
        />
      </div>
      <div className="offer-card-content">
          <div className="title">{heading}</div>
          <p>{paragraph}</p>
        {/* <RoundedButton redirect={btnRedirect} btnClassName={btnClassName}>
          {btnName}
        </RoundedButton> */}
      </div>
      {/* <Link href={`${cardRedirect}`}>
        <a className="stretched-link" />
      </Link> */}
    </div>
  );
};

export default OfferCard;
