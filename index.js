const core = require('@actions/core');
const { findNeoForgeVersion, findNeoFormVersion } = require("./version");

async function run() {
  try {
    const minecraftVersion = core.getInput('minecraftVersion');
    core.info(`Finding NeoForge versions for ${minecraftVersion}...`);

    const neoForgeVersion = await findNeoForgeVersion(minecraftVersion);
    const neoFormVersion = await findNeoFormVersion(minecraftVersion);

    core.setOutput('neoForgeVersion', neoForgeVersion);
    core.setOutput('neoFormVersion', neoFormVersion);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
