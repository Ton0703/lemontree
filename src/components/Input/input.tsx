import React, { ReactElement } from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";

type InputSIze = "lg" | "sm";

export interface InputPros
  extends Omit<React.InputHTMLAttributes<HTMLElement>, "size"> {
  dsiabled?: boolean;
  size?: InputSIze;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
}
const Input: React.FC<InputPros> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const classes = classNames("lemon-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-pretend": !!prepend,
  });

  //防止用户在setState中给value设置了undefind而引起报错
  const fixControlledValue = (value: any) => {
      if(typeof value === undefined || value === null){
          return ''
      }
      return value
  }
  if('value' in props){
      delete restProps.defaultValue
      restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="lemon-inout-group-pretend">{prepend}</div>}
      {icon && (
        <div className="icon-wrap">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input 
         className='lemon-input-inner'
         disabled={disabled}
         {...restProps}
      />
      {append && <div className="lemon-inout-group-append">{append}</div>}
    </div>
  );
};

export default Input;
