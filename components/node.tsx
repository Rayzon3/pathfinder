const Node = ({ isStart, isEnd }) => {
  const classes = isStart ? "node-start" : isEnd ? "node-end" : "";
  return <div className={`node ${classes}`}></div>;
};

export default Node;
