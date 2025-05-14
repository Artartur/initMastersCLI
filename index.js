#!/usr/bin/env node

import 'colors';
import { clearProject } from './commands/clear.js';

import { execSync, spawnSync } from 'child_process';
import path from 'path';
import process from 'process';
import pkg from 'enquirer';
const { Select } = pkg;

async function createProject(projectName) {
  const structureOption = await selectStructure();

  if (!isNgInstalled()) {
    console.log("Err: The Angular Cli hasn't been installed yet\n".red.bold);
    console.log("We're installing for you now...\n".green.bold);

    spawnSync('npm', ['install', '-g', '@angular/cli'], { 'stdio': 'inherit' });
    console.log(`\nCreating your new project called: ${projectName}`.green.bold, '... \n'.green.bold);
    spawnSync('ng', ['new', projectName, structureOption, '--style', 'css', '--ssr', false], { 'stdio': 'inherit', 'shell': true });

    path.join(process.cwd(), projectName);
    console.log(`\nInstalling dependencies in ${projectName} directory...`.green.bold);
    spawnSync('npm', ['install'], { stdio: 'inherit', shell: true });

    clearProject(projectName);
  } else {
    console.log(`Creating your new project called: ${projectName}`.green.bold, '... \n'.green.bold)
    spawnSync('ng', ['new', projectName, structureOption, '--style', 'css', '--ssr', false], { 'stdio': 'inherit', 'shell': true });
    path.join(process.cwd(), projectName);
    console.log(`\nInstalling dependencies in ${projectName} directory...`.green.bold);
    spawnSync('npm', ['install'], { stdio: 'inherit', shell: true });

    clearProject(projectName);
  }
}

function isNgInstalled() {
  try {
    const output = execSync(`npm list -g --depth=0 @angular/cli`, { stdio: 'pipe' }).toString();
    return output.includes('@angular/cli');
  } catch (e) {
    return false;
  }
}

function selectStructure() {
  const prompt = new Select({
    name: 'structure',
    message: 'Before we create the project, do you have any structural preferences? ',
    choices: ['module', 'standalone']
  })

  return prompt.run().then(res => res === 'module' ? '--no-standalone' : '');
}

function showHelp() {
  console.log(`
  Hey welcome to help page from initMaster CLI`.green.bold, `

  Use:`.cyan.bold, `
    ./index.js`.white, `<command>`.cyan.bold, ` [option]`.white, `

  Commands: `.cyan.bold, `
    help          Show this help
    version       Show this tool version
    create`.white, `<name>`.cyan.bold, `Create a new project`.white, `

  Examples:`.cyan.bold, `
    ./index.js help
    ./index.js version
    ./index.js create\n`.white);
}

function showVersion() {
  console.log('v1.0'.green.bold);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  const projectName = args[1];

  switch (command) {
    case 'help':
      showHelp();
      break;
    case 'version':
      showVersion();
      break;
    case 'create':
      createProject(projectName)
      break;
    default:
      showHelp();
      break;
  }
}

main();
