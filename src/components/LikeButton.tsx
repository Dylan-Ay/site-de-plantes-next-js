import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

function LikeButton() {
  const [color, setColor] = useState("black");

  return (
    <div>
      <FontAwesomeIcon
        icon={faRegularHeart}
        style={{
          fontSize: 25,
          cursor: "pointer",
          color: `${color}`,
        }}
        onClick={() =>
          color === "black" ? setColor("red") : setColor("black")
        }
      />
    </div>
  );
}

export default LikeButton;
