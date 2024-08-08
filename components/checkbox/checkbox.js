function Checkbox(props) {
  return (
    <div className="form-check filter-sorting-button">
      <input
        className="form-check-input"
        type="checkbox"
        defaultValue={props.value}
        id={"checkbox"+props.index}
        // defaultChecked={props.checked}
        checked={props.checked}
        onChange={(e)=>{props.changeHandler ? props.changeHandler(e) : {}}}
      />
      <label className="form-check-label" htmlFor={"checkbox"+props.index}>
        {props.value}
      </label>
    </div>
  );
}

export default Checkbox;
