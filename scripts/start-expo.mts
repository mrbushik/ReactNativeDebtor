import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFile), '..', '..');
const expoCli = path.join(projectRoot, 'node_modules', 'expo', 'bin', 'cli');
const tmpDir = path.join(projectRoot, '.tmp');
const expoHome = path.join(tmpDir, 'expo-home');
const npmCache = path.join(tmpDir, 'npm-cache');
const userArgs = process.argv.slice(2);

function hasExplicitPort(args: string[]): boolean {
  return args.some(
    (arg, index) => arg === '--port' || arg.startsWith('--port=') || args[index - 1] === '--port',
  );
}

const portArgs = hasExplicitPort(userArgs) ? [] : ['--port', '8081'];
const result = spawnSync(process.execPath, [expoCli, 'start', ...portArgs, ...userArgs], {
  cwd: projectRoot,
  env: {
    ...process.env,
    TMPDIR: tmpDir,
    __UNSAFE_EXPO_HOME_DIRECTORY: expoHome,
    npm_config_cache: npmCache,
    EXPO_NO_METRO_WORKSPACE_ROOT: '1',
    NODE_OPTIONS: process.env.NODE_OPTIONS || '',
  },
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
