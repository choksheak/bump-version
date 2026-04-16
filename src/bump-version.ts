import * as fs from "fs";
import * as path from "path";

function usage() {
  console.log(``);
  console.log(`Usage: bump-version [major|minor|patch|plus|get]`);
  console.log(``);
  console.log(`major: Bump the major version.`);
  console.log(`minor: Bump the minor version.`);
  console.log(`patch: Bump the patch version.`);
  console.log(` plus: Increment the patch till 9, then minor till 9, then major.`);
  console.log(`  get: Print version and exit.`);
  console.log(``);
  process.exit(1);
}

// Read args
const args = process.argv.slice(2);

if (args.length > 1) {
  console.error(`Too many arguments.`);
  usage();
}

let bumpType: "major" | "minor" | "patch" | "plus" | "get" = "plus";

if (args.length) {
  switch (args[0]) {
    case "major":
    case "minor":
    case "patch":
    case "plus":
    case "get":
      bumpType = args[0];
      break;
    default:
      console.error(`Invalid argument "${args[0]}".`);
      usage();
  }
}

const pkgPath = path.resolve(process.cwd(), "package.json");

// Read and parse package.json
if (!fs.existsSync(pkgPath)) {
  console.error("❌ package.json not found in current directory.");
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
const oldVersion: string = pkg.version;

if (!/^\d+\.\d+\.\d+$/.test(oldVersion)) {
  console.error(`❌ Invalid version format in package.json: "${oldVersion}"`);
  process.exit(1);
}

let [major, minor, patch] = oldVersion.split(".").map(Number);

major = major || 0;
minor = minor || 0;
patch = patch || 0;

switch (bumpType) {
  case "major":
    major += 1;
    minor = 0;
    patch = 0;
    break;

  case "minor":
    minor += 1;
    patch = 0;
    break;

  case "patch":
    patch += 1;
    break;

  case "plus":
    patch += 1;

    // When patch gets to 10, we increment the minor version.
    if (patch > 9) {
      patch = 0;
      minor += 1;

      // When minor gets to 10, we increment the major version.
      if (minor > 9) {
        major += 1;
        minor = 0;
        patch = 0;
      }
    }
    break;

  case "get":
    console.log(oldVersion);
    process.exit(0);

  default:
    bumpType satisfies never;
}

const newVersion = `${major}.${minor}.${patch}`;
pkg.version = newVersion;

// Write updated package.json
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");

// Pretty log
const label = bumpType.toUpperCase();
console.log(`✅ [${label}] Version bumped: ${oldVersion} → ${newVersion}`);
