const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

config.resolver.useWatchman = false;
config.watchFolders = [];

module.exports = config;
