const fetch = require('cross-fetch')

let findNeoForgeVersion = async function (minecraftVersion) {
    if (typeof minecraftVersion !== 'string') {
        throw new Error('minecraftVersion not a string');
    }

    const response = await fetch('https://maven.neoforged.net/api/maven/versions/releases/net/neoforged/neoforge');
    const json = await response.json();
    // NeoForge versions map to Minecraft versions by the major and patch
    const versionPrefix = minecraftVersion.replace(/^1\./, '');
    const versions = json.versions.filter(it => it.startsWith(versionPrefix));
    const version = versions[versions.length - 1];
    if (version) {
        return version;
    } else {
        throw new Error(`No version found for ${minecraftVersion}`);
    }
};

let findNeoFormVersion = async function (minecraftVersion) {
    if (typeof minecraftVersion !== 'string') {
        throw new Error('minecraftVersion not a string');
    }

    const response = await fetch('https://maven.neoforged.net/api/maven/versions/releases/net/neoforged/neoform');
    const json = await response.json();
    // NeoForm versions are prefixed with the full Minecraft version
    const versions = json.versions.filter(it => it.startsWith(minecraftVersion + '-'));
    const version = versions[versions.length - 1];
    if (version) {
        return version;
    } else {
        throw new Error(`No version found for ${minecraftVersion}`);
    }
};

module.exports = { findNeoForgeVersion, findNeoFormVersion };
