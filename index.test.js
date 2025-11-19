const findForgeVersion = require('./version');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('throws invalid version', async () => {
  await expect(findForgeVersion(123, 'latest')).rejects.toThrow('minecraftVersion not a string');
});

test('throws invalid channel', async () => {
  await expect(findForgeVersion('1.7.10', 'coolest')).rejects.toThrow("channel must be either 'latest' or 'recommended'");
});

test('throws missing version', async () => {
  await expect(findForgeVersion('1.12.99', 'recommended')).rejects.toThrow("No version found for 1.12.99 on channel recommended");
});

test('get latest version', async () => {
  const version = await findForgeVersion('1.15.2', 'latest');
  expect(version).toBe('31.2.60');
});

test('get recommended version', async () => {
  const version = await findForgeVersion('1.16.4', 'recommended');
  expect(version).toBe('35.1.4');
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_MINECRAFTVERSION'] = '1.16.5';
  process.env['INPUT_CHANNEL'] = 'recommended';
  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node "${ip}"`, {env: process.env}).toString();
  console.log(result);
})
