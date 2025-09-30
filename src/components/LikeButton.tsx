import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';


export default function LikeButton() {
  const [color, setColor] = useState("black");

  return (
    <div>
      <FontAwesomeIcon
        icon={faHeart}
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
