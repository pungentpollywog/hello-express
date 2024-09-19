// import * as fs from 'node:fs/promises';
import { readFile } from 'node:fs';
import { open, writeFile } from 'node:fs/promises';

const defaultPath = './data/users.json';

/** getUsers
 * @param path: name and path of file with a list of user objects
 */
export async function getUsers(path = defaultPath) {
  let file = null;
  let users = [];
  try {
    file = await open(path, 'r');
    // const data = await file.readFile({ encoding: 'string' });
    const data = await file.readFile();
    users = JSON.parse(data);
  } catch (err) {
    console.error(err);
  } finally {
    await file?.close();
  }
  return users;
}

/** setUsers
 * @param users: a list of user objects to store
 * @param path: name and path of file with a list of user objects
 */
export async function setUsers(users, path = defaultPath) {
  let file = null;
  try {
    file = await open(path, 'w');
    // await writeFile(file, JSON.stringify(users), {encoding: 'string'});
    await writeFile(file, JSON.stringify(users));
  } catch (err) {
    console.error(err);
  } finally {
    await file?.close();
  }
}
