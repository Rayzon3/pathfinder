import { useState, useEffect } from "react";
import Node from "./node";

const Grid = () => {
  const rows: number = 5;
  const cols: number = 5;

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
    this.g = 0;
    this.f = 0;
    this.h = 0;
  }

  console.log(Grid);

  return <div></div>;
};

export default Grid;
