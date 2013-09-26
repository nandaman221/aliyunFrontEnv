/*
 * grunt-init-aliyunFrontEnd
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Used for Front-End development of aliyun project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_svn_branch_ should be a static svn resources and be strict formatted like: ' +
  'http://svn.alibaba-inc.com/repos/ali_yun/static/static_cloudeye/branches/20130916_302513_1\n' +
  '_appName_ should be the folder name which is the direct child directory of the js or css folder. ' +
  'Like the branch above, the appName is cloudeye because css/js folder\'s direct child is cloudeye.\n'  +
  'If you don\'t asign the value of svn_branch and appName, you can edit svn.json later. ' +
  '\n\n'+
  'For more information, please see the following documentation:' +
  '\n\n'+
  'Handle the grunt-template        http://docs.alibaba-inc.com/pages/editpage.action?pageId=129113667';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt getsvn_ to get' +
  'the whole static resources. then, execute _grunt_ to start the server.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({company: 'aliyun'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description', 'Used for Front-End development of aliyun project.'),
    init.prompt('version'),
    init.prompt('svn_branch'),
    init.prompt('svn_appName'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name')
  ], function(err, props) {
    // A few additional properties.
    props.allInfo = props.name + '-info.json';
    // cut the svnbranch
    props.svn_project = props.svn_suffix = 'undefined';
    if(props.svn_branch.indexOf('http://svn.alibaba-inc.com/repos/ali_yun/static/') !== -1){
        var suffix = props.svn_branch.slice(48),
            slash = suffix.indexOf('/');
        if(slash !== -1){
            props.svn_project = suffix.slice(0, slash);
            props.svn_suffix = suffix.slice(slash + 1);
            if(props.svn_suffix.lastIndexOf('/') === props.svn_suffix.length - 1){
                props.svn_suffix = props.svn_suffix.slice(0, -1);
            }
        }
    }

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);
    // Actually copy (and process) files.
    // {noProcess: 'libs/**'}
    init.copyAndProcess(files, props);

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
        name: props.name,
        version: props.version,
        discription: props.discription,
        devDependencies: {
            "grunt": "~0.4.1",
            "grunt-contrib-jshint": "~0.6.3",
            "grunt-contrib-concat": "~0.3.0",
            "grunt-contrib-uglify": "~0.2.4",
            "grunt-contrib-clean": "~0.5.0",
            "grunt-contrib-watch": "~0.5.3",
            "grunt-contrib-connect": "~0.5.0",
            "grunt-open": "~0.2.2",
            "grunt-svn-fetch": "~0.1.2",
            "matchdep": "~0.1.2"
        }
    });

    // Generate jquery.json file.
    init.writePackageJSON(props.allInfo, props);

    // All done!
    done();
  });

};
