#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-v, --version', 'output the version number')
  .help('-h, --help', 'display help for command')

program.parse();