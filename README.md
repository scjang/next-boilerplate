# Web App scaffolding

This scaffolding was made in TypeScript, Next js, Express js with React.

## How to use?

```bash
# if you use next js 13 experimental, you need to use node 16.8.0
nvm use 16.8.0

yarn install
yarn dev
```

## Directory Structure

```
node_modules
src
├── @types
├── components
├── app
├── server
│   └── logger
├── services
│   └── api
├── theme
├── hooks
│   └── feature
│     └── typeName
│       └── api
│       └── updater
└── utils
```

## ~~Use Next js 13 (Deprecated)~~
```bash
## set node version
nvm use 16.8.0

## change directory name
mv {project_pages_dir_path}/pages {project_pages_dir_path}/_pages
mv {project_app_dir_path}/_app {project_app_dir_path}/app
```

```javascript
## modify next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  ...
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  ...
}
```