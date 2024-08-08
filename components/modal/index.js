import { useEffect } from "react";

export const ModalItem = ({
  show,
  children,
  hideCloseIcon,
  closeAction,
  closeIconColor,
  style,
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) {
    return <></>;
  } else {
    return (
      <>
        <div className="modal-bg" onClick={close}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={style}
          >
            {hideCloseIcon ? null : (
              <div
                className="modal-close-icon"
                style={{ background: closeIconColor, marginBottom:"2px" }}
                onClick={close}
              >
                <img height="14" style={{fill:'#57616A'}} src="/assets/icons/icon-angle-left-grey.svg" alt="" />
              </div>
            )}
            {children}
          </div>
        </div>
      </>
    );
  }
  function close(e) {
    closeAction(false);
  }
};

const Head = ({ children, title, subtitle }) => {
  return (
    <div className="modal-header">
      {title ? <h3>{title}</h3> : null}
      {subtitle ? <div className="modal-subtitle">{subtitle}</div> : null}
    </div>
  );
};

const Body = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

const Footer = ({ children, justify }) => {
  var main_class_list = ["modal-item-footer"];
  if (justify) {
    main_class_list.push(justify);
  }
  return <div className={main_class_list.join(" ")}>{children}</div>;
};

ModalItem.Head = Head;
ModalItem.Body = Body;
ModalItem.Footer = Footer;
