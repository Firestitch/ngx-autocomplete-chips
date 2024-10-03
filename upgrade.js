const fs = require('fs');
const path = require('path');

const execSync = require('child_process').execSync;

let exec = function(cmd) {
  console.log(cmd);
  execSync(cmd, { stdio: 'inherit' });
}

const package = JSON.parse(fs.readFileSync('package.json').toString());
package.version = '15.0.0';
fs.writeFileSync('package.json', JSON.stringify(package, undefined, 2));

exec('npm i --force --legacy-peer-deps');
exec('node node_modules/@angular/cli/bin/ng update @angular/core@15 @angular/cli@15 --force --allow-dirty');
exec('node node_modules/@angular/cli/bin/ng update @angular/material@15 --force --allow-dirty');
exec('npm install @firestitch/component-tools@15.0.5 --save-dev');
exec('npm install @firestitch/example@15.0.1 --save-dev');
exec('npm install @firestitch/message@15.0.0 --save-dev');

const walk = (dir) => {
  try {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        // Recurse into subdir
        results = [...results, ...walk(file)];
      } else {
        // Is a file
        results.push(file);
      }
    });
    return results;
  } catch (error) {
    console.error(`Error when walking dir ${dir}`, error);
  }
};

const edit = (filePath, regex, replaceVal) => {
  const oldContent = fs.readFileSync(filePath, {encoding: 'utf8'});
  const newContent = oldContent.replace(regex, replaceVal);
  fs.writeFileSync(filePath, newContent, {encoding: 'utf-8'});
  console.log(`Edited file: ${filePath}`);
};

['playground', 'src'].forEach((dir) => {
  walk(dir)
    .forEach(filePath => edit(filePath, new RegExp('MAT_LEGACY_[^\\s]* as ', 'g'), ''));

  walk(dir)
    .forEach(filePath => edit(filePath, new RegExp('MatLegacy[^\\s]* as ', 'g'), ''));
  
  walk(dir)
      .forEach(filePath => edit(filePath, new RegExp('/legacy-', 'g'), '/'));
});

