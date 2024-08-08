import Link from 'next/link';

const QuickFilterItemComponent = ({ name, redirect }) => {
  return (
    <li>
      <Link href={redirect}>
        <a>{name}</a>
      </Link>
    </li>
  );
};

export default QuickFilterItemComponent;
