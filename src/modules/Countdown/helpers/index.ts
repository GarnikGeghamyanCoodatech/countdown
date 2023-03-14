export const formatMillisecondsToTimeString = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const remainingSeconds = seconds % 60;
  const remainingMilliseconds = milliseconds % 1000;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes % 60).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  const formattedMilliseconds = String(Math.floor(remainingMilliseconds / 100)).padStart(1, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export const timeStringToMilliseconds = (value: string) => {
  const [hours, minutes, seconds] = value.split(":").map(Number);

  return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
};
