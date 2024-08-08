import { useRouter } from 'next/router';

const SettingsHeader = ({ name }) => {
  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  return (
    <header className="header-fixed-top header-default">
      <div className="container">
        <nav className="navbar">
          <div className="nav-action">
            <a onClick={onBack}>
              <img
                src="/assets/images/icons/icon-header-back.svg"
                alt=""
                // onclick="history.back()"
              />
            </a>
          </div>
          {name && <h3 className="nav-center-text">{name}</h3>}
        </nav>
      </div>
    </header>
  );
};
export default SettingsHeader;
