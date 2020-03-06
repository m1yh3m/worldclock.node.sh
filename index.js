#!/usr/bin/env node

const program = require('commander')
const lib = require('./lib')

function run() {
    lib.clock()
}

program
    .action(run)
    .parse(process.argv)
