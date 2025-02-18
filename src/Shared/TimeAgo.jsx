import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  if (!timestamp) return <span>Invalid date</span>;

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return <span>Invalid date</span>;

  return <span>{formatDistanceToNow(date, { addSuffix: true })}</span>;
};

export default TimeAgo;
