/* eslint-disable no-mixed-operators */
const week = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

const getYear = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  return date.getFullYear();
};

export const getWeek = (w = week(), y = getYear()) => {
  const date = new Date(y, 0, 1 + (w - 1) * 7);
  date.setDate(date.getDate() + (0 - date.getDay()));
  return date;
};

const conditions = duration => {
  const dayDiff = duration.getTime() / (60 * 60 * 24 * 1000);
  return [
    { value: `${Math.round(dayDiff)} days`, condition: dayDiff > 1 },
    {
      value: `${duration.getUTCHours()} hours`,
      condition: duration.getUTCHours() > 1
    },
    {
      value: `${duration.getUTCMinutes()} minutes`,
      condition: duration.getUTCMinutes() > 1
    },
    {
      value: `${duration.getUTCSeconds()} seconds`,
      condition: duration.getUTCSeconds() > 1
    }
  ];
};
export const getDuration = lastAccessTime => {
  const interval = new Date(new Date() - lastAccessTime);
  let span;
  const conditionList = conditions(interval);
  conditionList.some((item, index) => {
    if (item.condition === true) {
      span = `${item.value} ${conditionList
        .slice(index + 1)
        .map(period => period.value)
        .join(' ')}`;
      return true;
    }
  });
  return span;
};
