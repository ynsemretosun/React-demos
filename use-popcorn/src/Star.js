import { useState } from "react";
import PropTypes from "prop-types";
const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  starNumber: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  initialRate: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  starNumber = 5,
  color = "red",
  size = 25,
  className = "",
  messages = null,
  initialRate = 0,
  onSetRating,
}) {
  const [ratedStar, setRatedStar] = useState(initialRate);
  const [tempRating, setTempRating] = useState(0);
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  const textStyle = {
    lineHeight: "1px",
    margin: "0px",
    color: color,
    fontSize: `${size - 5}px`,
  };
  function handleRated(index) {
    setRatedStar(index + 1);
    onSetRating(index + 1);
  }
  function handleMouseOverStar(index) {
    setTempRating(index + 1);
  }
  function handleMouseLeaveStar() {
    setTempRating(0);
  }
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: starNumber }, (_, index) => (
          <Star
            hoverStar={handleMouseOverStar}
            index={index}
            leaveStar={handleMouseLeaveStar}
            handleRated={handleRated}
            starStyle={starStyle}
            key={index}
          >
            {tempRating > 0 ? (
              tempRating >= index + 1 ? (
                <FullStar color={color} />
              ) : (
                <EmptyStar color={color} />
              )
            ) : ratedStar >= index + 1 ? (
              <FullStar color={color} />
            ) : (
              <EmptyStar color={color} />
            )}
          </Star>
        ))}
      </div>
      <p style={textStyle}>
        {messages !== null && messages.length === starNumber
          ? tempRating > 0
            ? messages[tempRating - 1]
            : messages[ratedStar - 1]
          : tempRating || ratedStar || ""}
      </p>
    </div>
  );
}

function FullStar({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      stroke={color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function EmptyStar({ color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function Star({
  children,
  hoverStar,
  leaveStar,
  handleRated,
  index,
  starStyle,
}) {
  return (
    <span
      style={starStyle}
      onMouseOver={() => hoverStar(index)}
      onMouseLeave={() => leaveStar(index)}
      onClick={() => handleRated(index)}
    >
      {children}
    </span>
  );
}
/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg> */
