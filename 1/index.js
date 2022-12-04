const fs = require('fs')
const file = fs.readFileSync('./input', 'utf-8')

const elves = file
  .replace(/\s+\n$/, '')
  .split('\n\n')
  .map((e, i) => {
    const calories = e.split('\n').reduce((sum, e) => sum + Number(e), 0)
    return { index: i, calories }
  })
  .sort((a, b) => b.calories - a.calories)

const top1 = elves[0]
const top3Calories = elves[0].calories + elves[1].calories + elves[2].calories
console.log('max elf', top1)
console.log('top 3  total', top3Calories)
