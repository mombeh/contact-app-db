// commands/add.js
import db from '../database/index.js';
import chalk from 'chalk';

async function addContact(options) {
    const { name, phone, email, address, group } = options;

    try {
        await db.query(
            `INSERT INTO contacts (name, phone, email, address, "group")
       VALUES ($1, $2, $3, $4, $5)`,
            [name, phone, email, address || null, group || null]
        );

        console.log(chalk.green(`Contact '${name}' added successfully!`));
    } catch (err) {
        console.log(chalk.red('Failed to add contact:'), err);
    }
}

export default addContact;
