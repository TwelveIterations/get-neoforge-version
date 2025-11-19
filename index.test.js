const { findNeoForgeVersion, findNeoFormVersion } = require('./version');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('throws invalid version', async () => {
  await expect(findNeoForgeVersion(123)).rejects.toThrow('minecraftVersion not a string');
});
test('throws missing version', async () => {
  await expect(findNeoForgeVersion('1.12.99')).rejects.toThrow("No version found for 1.12.99");
});

test('get latest version', async () => {
  const version = await findNeoForgeVersion('1.15.2');
  expect(version).toBe('31.2.60');
});

test('get recommended version', async () => {
  const version = await findNeoFormVersion('1.16.4');
  expect(version).toBe('35.1.4');
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MINECRAFTVERSION'] = '1.16.5';
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node "${ip}"`, {env: process.env}).toString();
  console.log(result);
})
