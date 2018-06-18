 
'use strict';
const path = require('path');
const fs = require('fs');
const url = require('url');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl ||
    (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

module.exports = {
  CDN: '',

  postCssConfig: resolveApp('config/misc/postcss.config.js'),
  tsconfig: resolveApp('config/tsconfig.json'),
  dotenv: resolveApp('config/misc/env'),
  BuildRoot: resolveApp('./build/'),
  ProductionBuild: resolveApp('./public'),
  DevelopmentBuild: resolveApp('development'),
  devServerTrueRoot: resolveApp('development/'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('./src/template/index.html'),
  appIndexTsx: resolveApp('./src/index.tsx'),
  appPackageJson: resolveApp('./package.json'),
  appSrc: resolveApp('./src'),
  yarnLockFile: resolveApp('./yarn.lock'),
  testsSetup: resolveApp('./src/setupTests.ts'),
  appNodeModules: resolveApp('./node_modules'),
  appTsConfig: resolveApp('./tsconfig.json'),
  appTsProdConfig: resolveApp('./config/misc/tsconfig.prod.json'),
  appTsLint: resolveApp('./tslint.json'),
  publicUrl: getPublicUrl(resolveApp('./package.json')),
  servedPath: getServedPath(resolveApp('./package.json')),
  StartPage: 'MultiPassage?RecordId=864655EE-38B2-4072-B20E-007ADFBC269E&assignmentId=123RVWYBAZW00EXAMPLE456RVWYBAZW00EXAMPLE&hitId=123RVWYBAZW00EXAMPLE&turkSubmitTo=https://www.mturk.com/&workerId=AZ3456EXAMPLE'
};
