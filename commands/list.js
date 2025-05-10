// commands/list.js
import db from '../database/index.js';
import chalk from 'chalk';

async function listContacts() {
    try {
        const result = await db.query(`SELECT * FROM contacts ORDER BY id`);

        if (result.rows.length > 0) {
            console.table(result.rows);
        } else {
            console.log(chalk.yellow('No contacts found.'));
        }
    } catch (err) {
        console.log(chalk.red('Failed to list contacts:'), err);
    }
}

export default listContacts;
