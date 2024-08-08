function RadioButton(props) {
  return (
    <div className="form-check filter-sorting-button">
      <input
        className="form-check-input"
        type="radio"
        name="filter-sorting"
        id={"radio"+props.index}
        //defaultValue={props.value}
        checked={props.checked}
        onChange={(e)=>{props.changeHandler ? props.changeHandler(e) : {}}}
      />
      <label className="form-check-label" htmlFor={"radio"+props.index}>
        {props.value}
      </label>
    </div>
  );
}

export default RadioButton;
