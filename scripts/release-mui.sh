#!/bin/bash

set -e

PACKAGE_JSON="packages/elements-mui/package.json"

# Function to increment version
increment_version() {
  local version=$1
  local type=${2:-patch}  # default to patch
  
  IFS='.' read -ra VERSION_PARTS <<< "$version"
  local major=${VERSION_PARTS[0]}
  local minor=${VERSION_PARTS[1]}
  local patch=${VERSION_PARTS[2]}
  
  case $type in
    major)
      major=$((major + 1))
      minor=0
      patch=0
      ;;
    minor)
      minor=$((minor + 1))
      patch=0
      ;;
    patch)
      patch=$((patch + 1))
      ;;
    *)
      echo "Error: Invalid version type. Use 'major', 'minor', or 'patch'"
      exit 1
      ;;
  esac
  
  echo "${major}.${minor}.${patch}"
}

# Get current version
CURRENT_VERSION=$(node -p "require('./$PACKAGE_JSON').version")

# Determine version type (default to patch)
VERSION_TYPE=${1:-patch}

# Increment version
NEW_VERSION=$(increment_version "$CURRENT_VERSION" "$VERSION_TYPE")

echo "Current version: $CURRENT_VERSION"
echo "New version: $NEW_VERSION"

# Update package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$PACKAGE_JSON', 'utf8'));
pkg.version = '$NEW_VERSION';
fs.writeFileSync('$PACKAGE_JSON', JSON.stringify(pkg, null, 2) + '\n');
"

echo "Updated $PACKAGE_JSON to version $NEW_VERSION"

# Commit the change
git add "$PACKAGE_JSON"
git commit -m "chore: bump ai-elements-mui to $NEW_VERSION"

echo "Committed version change"

# Create git tag
TAG_NAME="ai-elements-mui@$NEW_VERSION"
git tag "$TAG_NAME"

echo "Created tag: $TAG_NAME"

# Push commit and tag
git push origin HEAD
git push origin "$TAG_NAME"

echo "Pushed commit and tag $TAG_NAME to origin"

