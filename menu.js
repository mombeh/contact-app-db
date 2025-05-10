#!/usr/bin/env node
import readline from 'readline';
import dotenv from 'dotenv';
import addContact from './commands/add.js';
import listContacts from './commands/list.js';
import searchContacts from './commands/search.js';
import updateContact from './commands/update.js';
import deleteContact from './commands/delete.js';
import assignGroup from './commands/group.js';
import chalk from 'chalk';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log(chalk.blueBright('\n Welcome to Contact Manager!'));
  console.log('1. Add Contact');
  console.log('2. Delete Contact');
  console.log('3. Update Contact');
  console.log('4. View All Contacts');
  console.log('5. Search Contact');
  console.log('6. Assign Group');
  console.log('7. Exit');

  rl.question('\nChoose an option (1-7): ', async (choice) => {
    switch (choice.trim()) {
      case '1':
        await promptAddContact();
        break;
      case '2':
        await promptDeleteContact();
        break;
      case '3':
        await promptUpdateContact();
        break;
      case '4':
        await listContacts();
        break;
      case '5':
        await promptSearchContact();
        break;
      case '6':
        await promptAssignGroup();
        break;
      case '7':
        console.log(chalk.green('\n Exiting. Goodbye!'));
        rl.close();
        return;
      default:
        console.log(chalk.red(' Invalid option.'));
    }
    showMenu();
  });
}

// Prompt wrappers

async function promptAddContact() {
  const options = {};
  await ask('Name: ', val => options.name = val);
  await ask('Phone: ', val => options.phone = val);
  await ask('Email: ', val => options.email = val);
  await ask('Address (optional): ', val => options.address = val);
  await ask('Group (optional): ', val => options.group = val);
  await addContact(options);
}

async function promptDeleteContact() {
  const options = {};
  await ask('Contact ID to delete: ', val => options.id = val);
  await deleteContact(options);
}

async function promptUpdateContact() {
  const options = {};
  await ask('Contact ID to update: ', val => options.id = val);
  await ask('New name (leave empty to skip): ', val => { if (val) options.name = val });
  await ask('New phone (leave empty to skip): ', val => { if (val) options.phone = val });
  await ask('New email (leave empty to skip): ', val => { if (val) options.email = val });
  await ask('New address (leave empty to skip): ', val => { if (val) options.address = val });
  await ask('New group (leave empty to skip): ', val => { if (val) options.group = val });
  await updateContact(options);
}

async function promptSearchContact() {
  const options = {};
  await ask('Name to search: ', val => options.name = val);
  await searchContacts(options);
}

async function promptAssignGroup() {
  const options = {};
  await ask('Contact ID: ', val => options.id = val);
  await ask('Group name: ', val => options.group = val);
  await assignGroup(options);
}

// Wrapper for readline questions
function ask(question, handler) {
  return new Promise(resolve => {
    rl.question(chalk.cyan(question), answer => {
      handler(answer.trim());
      resolve();
    });
  });
}

// Start app
showMenu();
