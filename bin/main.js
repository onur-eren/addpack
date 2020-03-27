#!/usr/bin/env node
const exec = require('child_process').exec;

function getOptions() {
    function getArgs() {
        return process.argv.splice(2);
    }
    function getOptions() {
        var args = getArgs();
        console.log(args);
        var options = new Object();
        for (let i = 0; i < args.length; i++) {
            const element = args[i];
            if (element.substr(0, 2) === '--') {
                options[element.substr(2)] = args[i + 1]
                i++;
            }
        }
        return options;
    }

    var options = getOptions()
    console.log('options:', options);
    return options;
}
var options = getOptions();
var getLatestFile = require('./getLatestFile.js')(options['pack']);
if(!getLatestFile){
    console.log('Failed');
    return;
}
console.log('yarn add '+getLatestFile);

const child = exec('yarn add '+getLatestFile);
child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});
