import React from "react";
import { Radio, IconButton } from "evergreen-ui";

const TypeItem = ({ props, setType, active = false, resetType=false }) => {
  return (
    <React.Fragment>
      <label className={`item ${active ? "selected" : ""}`}>
        <Radio
          size={16}
          name="registrationtype"
          value={props?.id.toString()}
          label={props?.title}
          onChange={(e) => setType(e.target.value)}
          checked={props.active}
        />

        <div className="right">
          <span className="price">{props?.price}</span>

          {props.active && (
            <IconButton
              className="edit"
              icon="edit"
              height={40}
              onClick={() => {setType(false); resetType()}}
            />
          )}
        </div>
      </label>
    </React.Fragment>
  );
};

export default TypeItem;
