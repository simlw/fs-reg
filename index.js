const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function FsReg() {}

/**
 * Find the file. The file path may be a string 
 * or a regular expression
 * 
 * @param {String|RegExp} file The path of the file that is needed to find
 * @param {String} dir Optional, the directory to look for
 * @param {String} type Optional, the type of target, file or directory. 
 *                      The default value is file.
 * @returns
 */
FsReg.prototype.find = function(file, dir, type) {
    let targetDir = dir || '.';
    
    if (type !== undefined && type !== 'file' && type !== 'directory') {
        return Promise.reject(new Error('The last parameter must be "file" or "diretory"'));
    }
        
    if (file === undefined) {
        return Promise.reject(new Error('Paramters error, the first paramter must be a string or a regular expression'));
    }

    if (dir && !_.isString(dir)) {
        console.log('The second paramter must be a string');
        return Promise.reject(new Error('The second paramter must be a string'));
    }

    return new Promise(function(resolve, reject) {
        fs.readdir(targetDir, function(err, files) {
            if (err) reject(err);

            let result = files.find(function(f) {
                try {
                    let stats = fs.fstatSync(fs.openSync(path.resolve(targetDir, f), 'r'));
                    let founded = _.isString(file) && f === file || _.isRegExp(file) && file.test(f);

                    if (type === undefined) {
                        return founded;
                    } else if (type === 'file') {
                        return stats.isFile() && founded;
                    } else {
                        return stats.isDirectory() && founded;
                    }
                } catch (err) {
                    reject(err);
                }
            });

            resolve(result);
        });
    });
}



module.exports = new FsReg();