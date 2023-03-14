import React, { ChangeEvent, FC } from "react";

import { formatMillisecondsToTimeString } from "../../helpers";
import { COUNTDOWN_STATUSES } from "../../constants";

import "./styles.scss";

interface IProps {
  timer: number;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  status: COUNTDOWN_STATUSES;
}

const TimeInput: FC<IProps> = ({ timer, onChange, value, status }) => {
  return (
    <div>
      {status === COUNTDOWN_STATUSES.INITIAL ? (
        <input type="time" className="time-picker" step="1" value={value} onChange={onChange} />
      ) : (
        <div className="timer">{formatMillisecondsToTimeString(timer)}</div>
      )}
    </div>
  );
};

export default TimeInput;
