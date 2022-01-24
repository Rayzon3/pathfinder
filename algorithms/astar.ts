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
    console.log("path not found :/");

    openSet = openSet.filter((element): boolean => element != current);
    closedSet.push(current);
    console.log(closedSet);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neigbhour = neighbours[i];
      if (!closedSet.includes(neigbhour)) {
        let tempG = current.g + 1;
        let newPath = false;
        if (openSet.includes(neigbhour)) {
          if (tempG < neigbhour.g) {
            neigbhour.g = tempG;
            newPath = true;
          } else {
            neigbhour.g = tempG;
            newPath = true;
            openSet.push(neigbhour);
          }
          if (newPath) {
            neigbhour.h = heruistic(neigbhour, endNode);
            neigbhour.f = neigbhour.h + neigbhour.g;
            neigbhour.pervious = current;
          }
        }
      }
    }
  }
}

function heruistic(a: { x: number; y: number }, b: { x: number; y: number }) {
  let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
  return d;
}

export default Astar;
