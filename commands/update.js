// commands/update.js
import db from '../database/index.js';
import chalk from 'chalk';

async function updateContact(options) {
  const { id, name, phone, email, address, group } = options;

  try {
    const fields = [];
    const values = [];
    let idx = 1;

    if (name) {
      fields.push(`name = $${idx++}`);
      values.push(name);
    }
    if (phone) {
      fields.push(`phone = $${idx++}`);
      values.push(phone);
    }
    if (email) {
      fields.push(`email = $${idx++}`);
      values.push(email);
    }
    if (address) {
      fields.push(`address = $${idx++}`);
      values.push(address);
    }
    if (group) {
      fields.push(`"group" = $${idx++}`);
      values.push(group);
    }

    if (fields.length === 0) {
      return console.log(chalk.yellow('Nothing to update.'));
    }

    fields.push(`updated_at = NOW()`);

    const query = `UPDATE contacts SET ${fields.join(', ')} WHERE id = $${idx}`;
    values.push(id);

    await db.query(query, values);

    console.log(chalk.green(`Contact ${id} updated successfully.`));
  } catch (err) {
    console.error(chalk.red('Update failed:'), err);
  }
}

export default updateContact;
