const fs = require('fs')
const file = fs.readFileSync('./input', 'utf-8')

const rounds = file
  .trim()
  .split('\n')
  .map((r) => r.split(' '))

const shapes = {
  A: {
    shape: 'ROCK',
    beats: 'Z',
  },
  B: {
    shape: 'PAPER',
    beats: 'A',
  },
  C: {
    shape: 'SCISSORS',
    beats: 'B',
  },
  X: {
    shape: 'ROCK',
    beats: 'C',
    pts: 1,
  },
  Y: {
    shape: 'PAPER',
    beats: 'A',
    pts: 2,
  },
  Z: {
    shape: 'SCISSORS',
    beats: 'B',
    pts: 3,
  },
}

function calcShape([opp, me]) {
  const shape = shapes[me]

  const draw =
    ['A', 'B', 'C'].findIndex((i) => i === opp) ===
    ['X', 'Y', 'Z'].findIndex((i) => i === me)

  if (draw) {
    return shape.pts + 3
  }

  const win = shape.beats === opp

  if (win) {
    return shape.pts + 6
  }

  return shape.pts
}

const score = rounds.reduce((tot, round) => {
  return tot + calcShape(round)
}, 0)

console.log('score 1', score)

function part2() {
  const outcomes = {
    // Lose
    X: 0,
    // Draw
    Y: 3,
    // Wind
    Z: 6,
  }

  const shapes = ['A', 'B', 'C']

  function calc([opp, outcome]) {
    let pts = outcomes[outcome]

    pts += getShapePts([opp, outcome])

    return pts
  }

  function getShapePts([opp, outcome]) {
    const oppIdx = shapes.findIndex((s) => s === opp)
    let index

    if (outcome === 'X') {
      const i = oppIdx - 1
      index = getWrappedIndex(shapes, i)
    }

    if (outcome === 'Y') {
      index = oppIdx
    }

    if (outcome === 'Z') {
      const i = oppIdx + 1
      index = getWrappedIndex(shapes, i)
    }

    const pts = index + 1
    return pts
  }

  const score = rounds.reduce((tot, round) => tot + calc(round), 0)
  console.log('score 2', score)
}

function getWrappedIndex(arr, i) {
  return ((i % arr.length) + arr.length) % arr.length
}

part2()
