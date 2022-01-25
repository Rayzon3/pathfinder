# PathFinder

This web app shows the visualization of the very popular a-star(A\*) algorithm.

https://user-images.githubusercontent.com/51912472/150975007-32857ab2-9376-408c-b430-667d8892cbeb.mov

## About A\* Algorithm

A\* is an informed search algorithm, or a best-first search, meaning that it is formulated in terms of weighted graphs: starting from a specific starting node of a graph, it aims to find a path to the given goal node having the smallest cost.

### f(n)=g(n)+h(n)

here n is the next node on the path, g(n) is the cost of the path from the start node to n, and h(n) is a heuristic function that estimates the cost of the cheapest path from n to the goal.

## Made using

- TypeScript
- Next.js (overkill for this kind of project...but still :P )
- Tailwind CSS

## Steps to run this project

Install dependencies

```bash
yarn install
```

Run project

```bash
yarn dev
```

## Features I will be adding soon

- Ability to add custom walls 🧱
- Generate Mazes 🗺
- More Algorithms ⚙️
