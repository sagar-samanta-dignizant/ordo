// import { appRoutes } from '/constants/appRoutes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MenuDineInHeader = ({ setOpen }) => {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      window.scrollY >= 50 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [setIsScroll]);

  return (
    <header
      className={`header-fixed-top header-transparent ${
        isScroll ? 'bg-white header-shadow' : ''
      }`}
    >
      <div className="container">
        <nav className="navbar">
          <div className="nav-action">
            {/* <Link href={appRoutes.MAIN.subRoutes.QR_CODE_SCAN.pathname}>
              <a>
                <img
                  src="/assets/images/icons/icon-header-back.svg"
                  alt=""
                  // onclick="history.back()"
                />
              </a>
            </Link> */}
          </div>
          <div className="select-language">
            <div id="google_translate_element" />
          </div>
          <div className="nav-action ms-auto">
            <a href="#" className="heart-nav">
              <svg
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M14.3933 3.07338C14.0528 2.73271 13.6485 2.46247 13.2035 2.2781C12.7586 2.09372 12.2816 1.99883 11.8 1.99883C11.3183 1.99883 10.8414 2.09372 10.3964 2.2781C9.95142 2.46247 9.54714 2.73271 9.20663 3.07338L8.49997 3.78004L7.7933 3.07338C7.10551 2.38558 6.17266 1.99918 5.19997 1.99918C4.22728 1.99918 3.29443 2.38558 2.60663 3.07338C1.91884 3.76117 1.53244 4.69402 1.53244 5.66671C1.53244 6.6394 1.91884 7.57225 2.60663 8.26004L8.49997 14.1534L14.3933 8.26004C14.734 7.91954 15.0042 7.51525 15.1886 7.07028C15.373 6.62531 15.4678 6.14837 15.4678 5.66671C15.4678 5.18505 15.373 4.70811 15.1886 4.26314C15.0042 3.81817 14.734 3.41388 14.3933 3.07338Z"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width={16}
                      height={16}
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
          <div className="nav-action">
            <a onClick={() => setOpen(true)}>
            <img
								src="/assets/images/icons/icon-header-search.svg"
								alt=""
							/>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default MenuDineInHeader;
