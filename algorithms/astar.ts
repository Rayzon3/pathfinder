function Astar(startNode: any, endNode: any) {
  let openSet = []; //nodes we have to visit
  let closedSet = []; //nodes already visited
  let path = []; //nodes on shortest path

  openSet.push(startNode);
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    let current = openSet[leastIndex];
    if (current === endNode) {
      console.log("Path found !!");
    }

    openSet = openSet.filter((element): any => element != current);
    closedSet.push(current);
    console.log(closedSet);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!closedSet.includes(neighbour)) {
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
          neighbour.h = heruistic(neighbour, endNode);
          neighbour.f = neighbour.h + neighbour.g;
          neighbour.previous = current;
        }
      }
    }
  }
}

function heruistic(a: { x: any; y: any }, b: { x: any; y: any }) {
  let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
  return d;
}

export default Astar;
