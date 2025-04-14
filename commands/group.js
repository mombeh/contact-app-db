// commands/group.js
import db from '../database/index.js';
import chalk from 'chalk';

export default async function assignGroup(options) {
  const { id, group } = options;

  try {
    await db.query(
      `UPDATE contacts SET "group" = $1, WHERE id = $2`,
      [group, id]
    );

    console.log(chalk.green(` Contact ${id} assigned to group "${group}"`));
  } catch (err) {
    console.error(chalk.red(' Failed to assign group:'), err);
  }
}
