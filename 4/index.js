const fs = require('fs')
const file = fs.readFileSync('./input', 'utf-8')

const pairs = file
  .trim()
  .split('\n')
  .map((p) => p.split(','))

// Part 1

function isContained(pair) {
  const [first, second] = pair

  const [L1, U1] = first.split('-').map(Number)
  const [L2, U2] = second.split('-').map(Number)

  return (L1 <= L2 && U1 >= U2) || (L2 <= L1 && U2 >= U1)
}

const contained = pairs.map(isContained).filter(Boolean)
const containedCount = contained.length

console.log('contained', containedCount)

// Part 2

function isOverlap(pair) {
  const sorted = [...pair].sort((a, b) => {
    return Number(a.split('-')[0]) - Number(b.split('-')[0])
  })

  const [first, second] = sorted

  const [, U1] = first.split('-').map(Number)
  const [L2] = second.split('-').map(Number)

  return L2 <= U1
}

const overlap = pairs.map(isOverlap).filter(Boolean)
const overlapCount = overlap.length

console.log('overlaps', overlapCount)
