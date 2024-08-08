import Link from 'next/link';
const EasyButton = (props) => {
  return (
    <div>
      <Link href={`${props.redirect}`}>
        <a>
          <div className={`${props.btnClassName} easy-button`}>    
          {props.children}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default EasyButton;
