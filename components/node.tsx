const Node = ({
  isStart,
  isEnd,
  row,
  col,
  isWall,
}: {
  isStart: number;
  isEnd: number;
  row: number;
  col: number;
  isWall: boolean;
}) => {
  const classes = isStart
    ? "node-start"
    : isWall
    ? "isWall"
    : isEnd
    ? "node-end"
    : "";
  return <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>;
};

export default Node;
