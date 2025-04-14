// commands/search.js
import db from '../database/index.js';
import chalk from 'chalk';

async function searchContacts(options) {
  const { name } = options;

  try {
    const result = await db.query(
      `SELECT * FROM contacts WHERE LOWER(name) LIKE LOWER($1)`,
      [`%${name}%`]
    );

    if (result.rows.length === 0) {
      console.log(chalk.yellow(`No contacts matching "${name}" found.`));
      return;
    }

    console.table(result.rows);
  } catch (err) {
    console.error(chalk.red('Search failed:'), err);
  }
}

export default searchContacts;
