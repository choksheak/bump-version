import { defineConfig } from 'tsup';

export default defineConfig({
    clean: true,
    entry: ['src/bump-version.ts'],
    format: ['esm'],
    // Treats everything in 'dependencies' and 'peerDependencies' as external.
    skipNodeModulesBundle: true,
});
