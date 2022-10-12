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
            result[i] = `${i + 1} : ${line[i]}`
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
          result[i] = `${i + 1} : ${line[i]}`
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

// if (argument[0] === undefined || argument[1] === undefined) {
//   console.error('Missing arguments')
// } else {
//   fs.readFile(argument[1].toString(), 'utf8', (err, data) => {
//     if (err) {
//       console.error('File does not exist')
//       return
//     }
//     fs.access(argument[1].toString(), fs.constants.F_OK || fs.constants.W_OK, (fileerror) => {
//       const line = data.split(/\n/)
//       if (argument[2] === undefined || argument[2].toString() === '-n') {
//         fs.writeFile(argument[1].toString(), line.toString(), (error) => {
//           if (error) {
//             return console.log(error)
//           }
//           return console.log('The file was saved!')
//         })
//       } else if (argument[2].toString() === '-y') {
//         fs.writeFile(argument[1].toString(), line.toString(), (error) => {
//           if (error) {
//             return console.log(error)
//           }
//           return console.log('The file was saved!')
//         })
//         // console.log('The file will not be overwritten')
//       } else {
//         console.error('Third argument is only limited to only -y and -n.')
//       }
//     })
//   })
// }
