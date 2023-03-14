import React, { FC } from "react";

import "./styles.scss";

interface IProps {
  progress: number;
  isVisible: boolean;
}

const ProgressBar: FC<IProps> = ({ progress, isVisible }) => {
  return (
    <div className={`progress-bar ${isVisible ? "visible" : ""}`}>
      <div style={{ height: `${progress}%` }} className="progress-bar--thumb" />
    </div>
  );
};

export default ProgressBar;
