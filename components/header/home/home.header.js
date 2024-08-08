import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
function HomeHeader() {
  return (
    <>
      <header className="header-fixed-top home-nav-bar-for-mobile">
        
        <div className="container">
          <nav className="navbar">
            <div className="nav-action">
              <Link href="/profile">
                <a href="profile.html">
                  <img src="/assets/images/icons/icon-header-user.svg" alt="" />
                </a>
              </Link>
              
            </div>
            <div className="nav-search">
              <input type="search" name="" id="" placeholder="Search..."/>
              
            </div>
            <div className="nav-action">
              <Link href="/order-summary">
                <a>
                  <img src="/assets/images/icons/icon-header-bag.svg" alt="" />
                  <span className="nav-action-badge">9+</span>
                </a>
              </Link>
            </div>
            <div className="nav-action">
              <Link href="/notifications">
                <a href="notifications.html">
                  <img
                    src="/assets/images/icons/icon-header-notification.svg"
                    alt=""
                  />
                  <span className="nav-action-badge">9+</span>
                </a>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
export default HomeHeader;
