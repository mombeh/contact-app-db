// contacts.js (CLI Entry Point)
import { Command } from 'commander';
import dotenv from 'dotenv';
import addContact from './commands/add.js';
import listContacts from './commands/list.js';
import searchContacts from './commands/search.js';
import updateContact from './commands/update.js';
import deleteContact from './commands/delete.js';
import assignGroup from './commands/group.js';

dotenv.config();

const program = new Command();

program
  .name('contact-book')
  .description('CLI tool to manage personal contacts')
  .version('1.0.0');

program
  .command('add')
  .description('Add a new contact')
  .requiredOption('--name <name>', 'Name')
  .requiredOption('--phone <phone>', 'Phone number')
  .requiredOption('--email <email>', 'Email address')
  .option('--address <address>', 'Address')
  .option('--group <group>', 'Group to assign the contact to')
  .action(addContact);

program
  .command('list')
  .description('List all contacts')
  .action(listContacts);

program
  .command('search')
  .description('Search contacts by name')
  .requiredOption('--name <name>', 'Name to search')
  .action(searchContacts);

program
  .command('update')
  .description('Update an existing contact')
  .requiredOption('--id <id>', 'Contact ID')
  .option('--name <name>', 'New name')
  .option('--address <address>', 'New address')
  .option('--phone <phone>', 'Add new phone number')
  .option('--email <email>', 'Add new email')
  .action(updateContact);

program
  .command('delete')
  .description('Delete a contact')
  .requiredOption('--id <id>', 'Contact ID')
  .action(deleteContact);

program
  .command('group')
  .description('Assign a contact to a group')
  .requiredOption('--id <id>', 'Contact ID')
  .requiredOption('--group <group>', 'Group name')
  .action(assignGroup);

program.parse(process.argv);

  // If no command is passed, show interactive menu
  if (!process.argv.slice(2).length) {
    const { spawn } = await import('child_process');
    spawn('node', ['menu.js'], { stdio: 'inherit' });
  }
  
