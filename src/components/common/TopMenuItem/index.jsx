import React from "react";
import { useHistory } from "react-router-dom";

export default function TopMenuItem({ target, label }) {
  const { target, label } = props;

  const history = useHistory();
  return (
    <li>
      <button onClick={() => history.push(`/${target}`)} type="button">
        {label}
      </button>
    </li>
  );
}
