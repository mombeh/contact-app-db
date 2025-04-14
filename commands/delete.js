// commands/delete.js
import db from '../database/index.js';
import chalk from 'chalk';
import readline from 'readline';

async function deleteContact(options) {
  const { id } = options;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askConfirmation = () => {
    return new Promise((resolve) => {
      rl.question(chalk.yellow(`Are you sure you want to delete contact ID ${id}? (yes/no): `), (answer) => {
        rl.close();
        resolve(answer.toLowerCase());
      });
    });
  };

  try {
    const answer = await askConfirmation();

    if (answer !== 'yes' && answer !== 'y') {
      console.log(chalk.blue(' Deletion cancelled.'));
      return;
    }

    const res = await db.query(`DELETE FROM contacts WHERE id = $1`, [id]);

    if (res.rowCount === 0) {
      console.log(chalk.yellow(`No contact found with ID ${id}.`));
    } else {
      console.log(chalk.green(` Contact ${id} deleted successfully.`));
    }
  } catch (err) {
    console.error(chalk.red('Deletion failed:'), err);
  }
}

export default deleteContact;
