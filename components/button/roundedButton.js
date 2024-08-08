import Link from 'next/link';

const RoundedButton = ({ children, redirect, btnClassName }) => {
  return (
    <Link href={redirect}>
      <a className={`btn-offer-card ${btnClassName ? btnClassName : ''}`}>
        {children}
      </a>
    </Link>
  );
};
export default RoundedButton;
