// Helpers for writing info to console.log
const { program } = require('commander')
const logUpdate   = require('log-update')

// Number of items written to console in this section
let itemsLogged = 0

// Format in bold
const logTitle = (...args) => {
  // Finish previous log group
  itemsLogged = 0
  logUpdate.done()

  // Print title
  log(`\x1b[1m${args.join(" ")}\x1b[22m`)
}

// Indent by three spaces
const logItem = (...args) => {
  // Display item if within max log lines
  if(itemsLogged < program.maxLogLines)
    log('  ', ...args)
  else {
    // Otherwise, display number of hidden lines
    const hiddenLines = itemsLogged - program.maxLogLines + 1
    logUpdate('  ', '+', hiddenLines, 'more',
              '(run next-on-netlify with --max-log-lines XX to',
              'show more or fewer lines)')
  }

  itemsLogged += 1
}

// Just console.log
const log = (...args) =>
  console.log(...args)

module.exports = {
  logTitle,
  logItem,
  log
}
