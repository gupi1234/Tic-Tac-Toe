import React, { useState, useRef } from "react";
import "./TikTacToe.css";
import circle_icon from "../../assets/circle.png";
import cross_icon from "../../assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TikTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || data[num] !== "") return;

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src="${cross_icon}"/>`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src="${circle_icon}"/>`;
      data[num] = "o";
    }
    setCount((prev) => prev + 1);
    checkWin(won);
  };

  const checkWin = (won) => {
    // Win conditions
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
    // Draw condition
    else if (!data.includes("")) {
      setLock(true);
      titleRef.current.innerHTML = `It's a <span style="color: #26ffcb;">Draw!</span>`;
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations <img src="${cross_icon}"/> Win`;
    } else {
      titleRef.current.innerHTML = `Congratulations <img src="${circle_icon}"/> Win`;
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    titleRef.current.innerHTML = `Tic Tac Toe Game In <span> React</span>`;
    document.querySelectorAll(".boxes").forEach((box) => (box.innerHTML = ""));
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In <span> React</span>
      </h1>
      <div className="board">
        {[0, 1, 2].map((i) => (
          <div className="row1" key={i}>
            {[0, 1, 2].map((j) => {
              const index = i * 3 + j;
              return (
                <div
                  key={index}
                  className="boxes"
                  onClick={(e) => toggle(e, index)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TikTacToe;
