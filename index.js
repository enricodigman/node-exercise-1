const fs = require('fs')
const process = require('process')

const argument = process.argv.slice(2)

if (argument[0] === undefined || argument[1] === undefined) {
  console.log('Missing arguments')
} else {
  fs.access(argument[1].toString(), fs.F_OK, (state) => {
    const result = []
    if (!state) {
      if (argument[2] === undefined || argument[2] === '-n') {
        console.log('The file already exists.')
      } else if (argument[2] === '-y') {
        fs.readFile(argument[0].toString(), 'utf8', (error, data) => {
          const line = data.split(/\n/)
          for (let i = 0; i < line.length; i += 1) {
            result[i] = `${i + 1}: ${line[i]}`
          }
          fs.writeFileSync(argument[1].toString(), result.join('\n'), {
            encoding: 'utf8',
            flag: 'w',
          })
          console.log('Overwriting of file is done.')
        })
      } else {
        console.error('Third argument is only limited to -y and -n.')
      }
    } else {
      fs.readFile(argument[0].toString(), 'utf8', (error, data) => {
        const line = data.split(/\n/)
        for (let i = 0; i < line.length; i += 1) {
          result[i] = `${i + 1}: ${line[i]}`
        }
        fs.writeFileSync(argument[1].toString(), result.join('\n'), {
          encoding: 'utf8',
          flag: 'w',
        })
        console.log('Created ouput file')
      })
    }
  })
}
