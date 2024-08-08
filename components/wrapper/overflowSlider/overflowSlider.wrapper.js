import { classNames } from "/utils/classnames.util.js";

const OverflowSliderWrapper = ({ className, ...restProps }) => {
  return (
    <div
      className={classNames("overflow-slider", className)}
      {...restProps}
    ></div>
  );
};

export default OverflowSliderWrapper;
