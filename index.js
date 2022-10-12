const fs = require('fs')
const process = require('process')

const argument = process.argv.slice(2)

fs.readFile(argument.toString(), 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const line = data.split(/\n/)
  for (let i = 0; i < line.length; i += 1) {
    console.log(`${i + 1} : ${line[i]}`)
  }
})
