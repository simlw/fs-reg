# fs-reg
Locate files or directories based on file names or regular expressions.

## Installation
```
npm install fs-reg --save
```
## Params
```
find(file[, dir, type])
```
  **file:** the target file or directory name, accept string or regular expression.  

  **dir:** optional, the directory where to find the target, the default value is the current directory. The value must be string.  
  
  **type:** optional, if the parameter `"dir"` includes both directory and file with the same name, you can use this parameter to specify. The value can be "file" or "directory".

## Returns
Promise

## Examples
```
var fsReg = require('fs-reg');

fsReg.find('index.js')
  .then(function(file) {
      console.log(file);
  })
  .catch(function(err) {
    throw err;
  })

fsReg.find(/inde/, '.')
  .then(function(file) {
      console.log(file);
  })
  .catch(function(err) {
    throw err;
  })
```

## Connection
Welcome to open issues or connect to me: liuw809@163.com

