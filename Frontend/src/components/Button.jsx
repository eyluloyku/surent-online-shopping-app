import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

/* not a default export*/ /*props are passed as params*/

const STYLES = ["btn--primary", "btn--outline", "btn--outline2"];

const SIZES = ["btn--medium", "btn--large"];

/*button  component for whole main page.*/
export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0]; /* if there exists no styles given as prop, this will be executed automatically */

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to="/Register" className="btn-mobile">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>{" "}
      {/*whatever you put inside button it will render that. and yes you have to escape back to js to write comments*/}
    </Link>
  );
};
