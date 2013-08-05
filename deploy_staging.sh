#!/bin/bash

echo "Deploying to sugaar..."

# Build the App
grunt build --force

# Copy phonegap-desktop to dist
cp ./phonegap-desktop/debugdata.json ./dist/debugdata.json
cp ./phonegap-desktop/js/phonegap-desktop.js ./dist/phonegap.js

# Create robots
cat << 'EOF' > ./dist/robots.txt
User-agent: *
Disallow: /
EOF

# Clean remote folder
ssh zarautz@37.153.97.168 "rm -rf ~/munoa/staging/current/web/*"

# () keeps the original folder before "cd"
(cd dist; scp -r . zarautz@37.153.97.168:/home/zarautz/munoa/staging/current/web)