const fsReg = require('./../index');
const assert = require('assert');

describe('FsReg', function() {
    describe('#find', function() {
        it('it should return file name when the file exists', function() {
            return fsReg.find('index.js')
                .then(function(file) {
                    assert.equal(file, 'index.js');
                })
        });

        it('it should return file name when the file exists', function() {
            return fsReg.find(/inde/)
                .then(function(file) {
                    assert.equal(file, 'index.js');
                })
        });

        it('it should return undefined when the file does not exists', function() {
            return fsReg.find('i')
                .then(function(file) {
                    assert.equal(file, undefined);
                })
        });

        it('it should reject error when the file path is blank', function() {
            return fsReg.find()
                .catch(function(err) {
                    assert.equal(err.message, 'Paramters error, the first paramter must be a string or a regular expression');
                });
        });

        it('it should reject error when the file path is not string or regular expression', function() {
            return fsReg.find(12)
                .catch(function(err) {
                    assert.equal(err.message, 'Paramters error, the first paramter must be a string or a regular expression');
                });
        });

        it('it should return the file when the file exists in the given directory', function() {
            return fsReg.find('index.js', '.')
                .then(function(file) {
                    assert.equal(file, 'index.js');
                })
        });

        it('it should reject error when directory parameter is not string or regular expression', function() {
            return fsReg.find('index.js', 32)
                .catch(function(err) {
                    assert.equal(err.message, 'The second paramter must be a string');
                })
        });

        it('it should return promise with the value of file name when the target file exists', function() {
            return fsReg.find(/t2/, 'test', 'file')
                .then(function(file) {
                    assert.equal('t2.js', file);
                })
        });

        it('it should return Promise with the value of directory name when the target directory exists', function() {
            return fsReg.find(/t2/, 'test', 'directory')
                .then(function(file) {
                    assert.equal('t2', file);
                })
        });

        it('it should reject error when the target type is not "file" or "directory"', function() {
            return fsReg.find(/t2/, 'test', '')
                .catch(function(err) {
                    assert.equal(err.message, 'The last parameter must be "file" or "diretory"');
                })
        });
    });
});
