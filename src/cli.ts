#!/usr/bin/env node

import 'reflect-metadata';
import CLIApplication from './app/cli-app.js';
import VersionCommand from './cli-command/version-command.js';
import HelpCommand from './cli-command/help-command.js';
import GenerateCommand from './cli-command/generate-command.js';
import ImportCommand from './cli-command/import-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand,
  new VersionCommand,
  new GenerateCommand,
  new ImportCommand,
]);
myManager.processCommand(process.argv);
