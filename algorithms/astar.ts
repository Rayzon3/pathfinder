function Astar(startNode: any, endNode: any) {
  let openSet = []; //nodes we have to visit
  let closedSet = []; //nodes already visited
  let path: any[] = []; //nodes on shortest path
  let visitedNodes: number[] = [];

  openSet.push(startNode);
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    let current = openSet[leastIndex];
    visitedNodes.push(current);
    if (current === endNode) {
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      return { path, visitedNodes };
    }

    openSet = openSet.filter((element): any => element != current);
    closedSet.push(current);
    console.log(closedSet);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let tempG = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tempG > neighbour.g) {
            neighbour.g = tempG;
            newPath = true;
          }
        } else {
          neighbour.g = tempG;
          newPath = true;
          openSet.push(neighbour);
        }
        if (newPath) {
          neighbour.h = heuristic(neighbour, endNode);
          neighbour.f = neighbour.h + neighbour.g;
          neighbour.previous = current;
        }
      }
    }
  }

  return { path, visitedNodes, error: "No Path Found :/" };
}

function heuristic(a: { x: number; y: number }, b: { x: number; y: number }) {
  let d = Math.abs(b.x - a.x) + Math.abs(b.y - a.y); // using manhattan distance as heuristic
  return d;
}

export default Astar;
