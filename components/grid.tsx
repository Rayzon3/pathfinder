import { useState, useEffect } from "react";
import Node from "./node";

const rows: number = 10;
const cols: number = 25;
const NODE_START_ROW: number = 0;
const NODE_START_COL: number = 0;
const NODE_END_ROW: number = rows - 1;
const NODE_END_COL: number = cols - 1;

const Grid = () => {
  const [Grid, setGrid] = useState<number[][]>([]);

  useEffect(() => {
    initGrid();
  }, []);

  //making grid, basically 2D array
  const initGrid = () => {
    const grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }

    setGrid(grid);
  };

  function Spot(this: any, i: number, j: number) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
  }

  console.log(Grid);
  const gridWithNode = () => {
    return (
      <div>
        <h1>Hello from grid</h1>
        {Grid.map((row: any, rowIndex) => {
          return (
            <div key={rowIndex} className="flex">
              {row.map((col: any, colIndex) => {
                const { isStart, isEnd } = col;
                return <Node key={colIndex} isStart={isStart} isEnd={isEnd} />;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return <div className="max-w-lg m-auto">{gridWithNode()}</div>;
};

export default Grid;
