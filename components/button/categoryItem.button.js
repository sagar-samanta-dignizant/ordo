import Link from "next/link";
import Image from "next/image";
const CategoryItemButton = ({
  image,
  name,
  redirect,
  onClick = function () {},
}) => {
  return (
    <li onClick={() => onClick()}>
      <Link href={`${redirect}`}>
        <a>
          <Image
            src={image ? image : ""}
            alt={image ? image : ""}
            height="56px"
            width="56px"
            style={{ borderRadius: "50%" }}
          />
          <h5 className="catagoryName" style={{width:"max-content", margin:"0 auto"}}>{name}</h5>
        </a>
      </Link>
    </li>
  );
};

export default CategoryItemButton;
