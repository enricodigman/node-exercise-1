const fs = require('fs')

const [,, contentFile, outputFile, option] = process.argv

const result = []
if (contentFile === undefined || outputFile === undefined) {
  process.stdin.on('data', (data) => {
    const line = data.toString().split('\n')
    for (let i = 0; i < line.length; i += 1) {
      console.log(`${i + 1}: ${line[i]}`)
    }
  })
} else if (fs.existsSync(outputFile)) {
  if (option !== '-y' && option !== '-n' && option !== undefined) {
    console.log('Third argument is only limited to -y and -n.')
    process.exit(1)
  }
  if (option === undefined || option === '-n') {
    console.log('The file already exists.')
    process.exit(1)
  }
  fs.readFile(contentFile, 'utf8', (error, data) => {
    const line = data.split(/\n/)
    for (let i = 0; i < line.length; i += 1) {
      result[i] = `${i + 1}: ${line[i]}`
    }
    fs.writeFileSync(outputFile, result.join('\n'), {
      encoding: 'utf8',
      flag: 'w',
    })
    console.log('Overwriting of file is done.')
  })
} else {
  fs.readFile(contentFile, 'utf8', (error, data) => {
    const line = data.split(/\n/)
    for (let i = 0; i < line.length; i += 1) {
      result[i] = `${i + 1}: ${line[i]}`
    }
    fs.writeFileSync(outputFile, result.join('\n'), {
      encoding: 'utf8',
      flag: 'w',
    })
    console.log('Created ouput file')
  })
}
