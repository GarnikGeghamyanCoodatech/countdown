import React, { FC } from "react";
import { Play, Pause, Stop } from "../../icons";

import { COUNTDOWN_STATUSES, INPUT_INITIAL_VALUE } from "../../constants";

import "./styles.scss";

interface IProps {
  status: COUNTDOWN_STATUSES;
  inputValue: string;
  onPlay: () => void;
  onStop: () => void;
  onPause: () => void;
}

const Actions: FC<IProps> = ({ onPlay, onStop, onPause, status, inputValue }) => {
  return (
    <div className="actions">
      {status !== COUNTDOWN_STATUSES.PLAYING ? (
        <button className={`button ${inputValue === INPUT_INITIAL_VALUE ? "disabled" : ""}`} onClick={onPlay}>
          <Play />
        </button>
      ) : (
        <button className="button" onClick={onPause}>
          <Pause />
        </button>
      )}
      <button onClick={onStop} className={`button ${status === COUNTDOWN_STATUSES.INITIAL ? "disabled" : ""}`}>
        <Stop />
      </button>
    </div>
  );
};

export default Actions;
