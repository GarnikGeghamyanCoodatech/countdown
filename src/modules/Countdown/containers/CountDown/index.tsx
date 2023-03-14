import React, { FC, MutableRefObject, useCallback, useRef, useState } from "react";

import ProgressBar from "../../components/ProgressBar";
import Actions from "../../components/Actions";
import TimeInput from "../../components/TimeInput";

import { timeStringToMilliseconds } from "../../helpers";
import { COUNTDOWN_STATUSES, INPUT_INITIAL_VALUE, ITERATION_STEP } from "../../constants";

import "./styles.scss";

interface IData {
  timer: number;
  progress: number;
  inputValue: string;
  status: COUNTDOWN_STATUSES;
}

const INITIAL_DATA = {
  timer: 0,
  progress: 100,
  inputValue: INPUT_INITIAL_VALUE,
  status: COUNTDOWN_STATUSES.INITIAL
};

const CountDown: FC = () => {
  const [data, setData] = useState<IData>(INITIAL_DATA);
  const intervalId: MutableRefObject<number | undefined> = useRef<number>();
  const timerRef = useRef(0);
  const totalTime = useRef(0);

  const handleChange = useCallback(({ currentTarget: { value } }: { currentTarget: { value: string } }) => {
    if (value) {
      const parsedMilliseconds = timeStringToMilliseconds(value);
      timerRef.current = parsedMilliseconds;
      totalTime.current = parsedMilliseconds;
      setData(prevState => ({
        ...prevState,
        timer: parsedMilliseconds,
        progress: 100,
        inputValue: value
      }));
    }
  }, []);

  const handleStop = useCallback(() => {
    clearInterval(intervalId.current);
    setData(INITIAL_DATA);
  }, []);

  const handlePlay = useCallback(() => {
    if (data.inputValue === INPUT_INITIAL_VALUE) return;
    setData(prevState => ({ ...prevState, status: COUNTDOWN_STATUSES.PLAYING }));

    const isReplaying = timerRef.current <= 1 && totalTime.current !== 0;
    if (isReplaying) {
      timerRef.current = totalTime.current;
      setData(prevState => ({ ...prevState, timer: totalTime.current, progress: 100 }));
    }

    intervalId.current = window.setInterval(() => {
      if (timerRef.current <= 1) {
        clearInterval(intervalId.current);
        setData(prevState => ({ ...prevState, status: COUNTDOWN_STATUSES.INITIAL, progress: 100 }));
        return;
      }
      setData(prevState => {
        timerRef.current = prevState.timer - ITERATION_STEP;
        const progress = (timerRef.current / totalTime.current) * 100;
        return { ...prevState, timer: timerRef.current, progress };
      });
    }, ITERATION_STEP);
  }, [data.inputValue]);

  const handlePause = useCallback(() => {
    clearInterval(intervalId.current);
    setData(prevState => ({ ...prevState, status: COUNTDOWN_STATUSES.PAUSED }));
  }, []);

  return (
    <div className="countdown-container">
      <ProgressBar progress={data.progress} isVisible={data.status !== COUNTDOWN_STATUSES.INITIAL} />
      <TimeInput timer={data.timer} onChange={handleChange} value={data.inputValue} status={data.status} />
      <Actions
        onPlay={handlePlay}
        onStop={handleStop}
        onPause={handlePause}
        status={data.status}
        inputValue={data.inputValue}
      />
    </div>
  );
};

export default CountDown;
