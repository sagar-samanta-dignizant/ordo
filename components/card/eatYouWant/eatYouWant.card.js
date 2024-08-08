import Link from "next/link";
import Image from "next/image";

const EatYouWantCard = ({ redirect, image, name, onClick = function () {} }) => {
	if (!image) {
		image = "";
	}
	return (
		<li onClick={() => onClick()}>
			<Link href={redirect}>
				<a>
					<figure>
						<Image
							src={image}
							layout="fill"
						/>
						<figcaption>{name}</figcaption>
					</figure>
				</a>
			</Link>
		</li>
	);
};
export default EatYouWantCard;
