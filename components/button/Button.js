


const Button = ({ children, isDisabled, type, buttonStyle,buttonSize, onClick }) => {
    return(
      <button type={type} disabled={isDisabled} className={`btn ${buttonStyle} ${buttonSize}`} onClick={()=>{onClick()}}>
      {children}
    </button>
    )

  };
  export default Button;

  export const ImageLeftButton = ({ children, isDisabled, type, buttonStyle,buttonSize,iconClass }) => {
    return(
      <button type={type} disabled={isDisabled} className={`btn ${buttonStyle} ${buttonSize}`}>
      <ImageLeftButton.Icon className={iconClass}/>
      {children}
    </button>
    )

  };

  export const ImageRightButton = ({ children, isDisabled, type, buttonStyle,buttonSize,iconClass }) => {
    return(
      <button type={type} disabled={isDisabled} className={`btn ${buttonStyle} ${buttonSize} `}>
      {children}
      <ImageRightButton.Icon className={iconClass}/>
    </button>
    )

  };
  export const OnlyIconButton = ({isDisabled, type, buttonStyle,buttonSize,iconClass }) => {
    return(
      <button type={type} disabled={isDisabled} className={`btn ${buttonStyle} ${buttonSize} `}>
      <OnlyIconButton.Icon className={iconClass}/>
    </button>
    )

  };
  const Icon = ({className}) => {
    return(
      <><i className={className}></i></>
    )
  }

  ImageRightButton.Icon = Icon;
  ImageLeftButton.Icon = Icon;
  OnlyIconButton.Icon = Icon;