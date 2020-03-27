#!/usr/bin/env node
const fs = require("fs");
var path = require('path');
var cwd = process.cwd();

function getVersions(target) {
    var file = target.substr(target.lastIndexOf('-') + 1);
    var versions = file.split('.');
    versions.splice(3, 1);
    versions = versions.map(v => Number(v));
    return versions;
}
function isVersionHigh(current, compare) {
    for (let index = 0; index < 3; index++) {
        // console.log(compare, current);
        if (compare[index] > current[index]) {
            return true;
        }
    }
    return false;
}
function getFolderPath(tgzroot) {
    var folderPath = path.join(cwd, tgzroot);

    return folderPath;
}
function getFiles(folderPath) {
    return fs.readdirSync(folderPath);
}
function getLastFile(files) {
    var latestFile = null;
    var version;
    var lastestVersion = [0, 0, 0];

    for (file of files) {
        index = file.lastIndexOf('.');
        if (file.substr(index + 1) !== 'tgz') {
            continue;
        }
        version = getVersions(file);
        if (isVersionHigh(lastestVersion, version)) {
            latestFile = file;
            lastestVersion = version;
        }
    }
    return (latestFile === null) ? false : latestFile;
}
function isPathExist(folderPath) {
    console.log('folderPath:', folderPath);
    if (!fs.existsSync(folderPath)) {
        console.log(folderPath + ' not exist');
        return false;
    }
    return true;
}

// console.log('ff', latestFile);
// var output = path.join(folderPath, latestFile);
// output = output.replace(/\\/g, '\\\\');
// output = output.replace(/\\/g, '/');
// global.last2 = 'value';
// console.log(output);
// console.log('asdsadsad');

module.exports = function (pack) {
    if (!isPathExist(pack)) {
        return false;
    }
    var folderPath = pack;

    var files = getFiles(folderPath);
    if (files.length === 0) {
        console.log('no file exist in ' + folderPath)
        return false;
    }
    var lastestFile = getLastFile(files);
    return path.join(folderPath, lastestFile);
}