#/bin/bash

set -ex

export AWS_PROFILE=smotana

pnpm run build

aws s3 sync ./build/ s3://ollisten.com/ --cache-control "max-age=604800" --exclude index.html --exclude asset-manifest.json
aws s3 sync ./build/ s3://ollisten.com/ --cache-control "max-age=0" --exclude "*" --include index.html --include asset-manifest.json

aws cloudfront create-invalidation --distribution-id EU4EXU6WQHNDM --paths "/*"
