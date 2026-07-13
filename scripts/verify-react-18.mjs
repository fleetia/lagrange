import { spawnSync } from 'node:child_process';
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const FIXTURE = join(ROOT, 'tests/fixtures/react-18-consumer');

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    env: process.env,
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} exited with ${result.status}`);
  }
}

async function verifyReact18() {
  const temporaryRoot = await mkdtemp(join(tmpdir(), 'lagrange-react-18-'));

  try {
    const artifacts = join(temporaryRoot, 'artifacts');
    const consumer = join(temporaryRoot, 'consumer');

    await mkdir(artifacts);
    run('pnpm', ['pack', '--pack-destination', artifacts], ROOT);

    const tarballs = (await readdir(artifacts)).filter((file) =>
      file.endsWith('.tgz'),
    );

    if (tarballs.length !== 1) {
      throw new Error(`Expected one package tarball, found ${tarballs.length}`);
    }

    await cp(FIXTURE, consumer, { recursive: true });

    const packagePath = join(consumer, 'package.json');
    const manifest = JSON.parse(await readFile(packagePath, 'utf8'));
    const tarballPath = join(artifacts, tarballs[0]);

    manifest.dependencies['@fleetia/lagrange'] = `file:${tarballPath}`;
    await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);

    run('pnpm', ['install', '--ignore-workspace'], consumer);
    run('pnpm', ['exec', 'tsc', '--noEmit'], consumer);
  } finally {
    await rm(temporaryRoot, { force: true, recursive: true });
  }
}

await verifyReact18();
