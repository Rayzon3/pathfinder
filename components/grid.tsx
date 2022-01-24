import { useState, useEffect } from "react";

import Node from "./node";
import Astar from "../algorithms/astar";

const rows: number = 25;
const cols: number = 25;
const NODE_START_ROW: number = 0;
const NODE_START_COL: number = 0;
const NODE_END_ROW: number = rows - 1;
const NODE_END_COL: number = cols - 1;

const Grid = () => {
  const [Grid, setGrid] = useState<number[][]>([]);
  const [Path, setPath] = useState<number[]>([]);
  const [VisitedNodes, setVisitedNodes] = useState<number[]>([]);

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

    addNeigbhours(grid);

    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    let path: any = Astar(startNode, endNode);
    startNode.isWall = false;
    endNode.isWall = false;
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
  };

  //add neighbours
  const addNeigbhours = (grid: any[][]) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addneighbours(grid);
      }
    }
  };

  function Spot(this: any, i: number, j: number) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbours = [];
    this.isWall = false;
    if (Math.random() < 0.2) {
      this.isWall = true;
    }
    this.previous = undefined;
    this.addneighbours = function (grid: any[][]) {
      let i = this.x;
      let j = this.y;
      if (i > 0) {
        this.neighbours.push(grid[i - 1][j]);
      }
      if (i < rows - 1) {
        this.neighbours.push(grid[i + 1][j]);
      }
      if (j > 0) {
        this.neighbours.push(grid[i][j - 1]);
      }
      if (j < cols - 1) {
        this.neighbours.push(grid[i][j + 1]);
      }
    };
  }

  // console.log(Grid);
  const gridWithNode = () => {
    return (
      <div>
        {Grid.map((row: any, rowIndex) => {
          return (
            <div key={rowIndex} className="flex">
              {row.map((col: any, colIndex: number) => {
                const { isStart, isEnd, isWall } = col;
                return (
                  <Node
                    key={colIndex}
                    isStart={isStart}
                    isEnd={isEnd}
                    row={rowIndex}
                    col={colIndex}
                    isWall={isWall}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const visualizePath = (shortestPath: string | any[]) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 40 * i);
    }
  };

  const visualize = () => {
    for (let i = 0; i <= VisitedNodes.length; i++) {
      if (i === VisitedNodes.length) {
        setTimeout(() => {
          visualizePath(Path);
        }, 80 * i);
      } else {
        setTimeout(() => {
          const node = VisitedNodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 80 * i);
      }
    }
  };

  console.log(Path);
  return (
    <div>
      <h1 className="m-4 text-blue-500 text-4xl font-bold">PathFinder</h1>
      <div className="max-w-lg m-auto">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded m-4"
          onClick={visualize}
        >
          Find Path (using A*)
        </button>
        {gridWithNode()}
      </div>
    </div>
  );
};

export default Grid;
