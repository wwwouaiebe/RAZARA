module.exports = function(grunt) {
	let banner = 
		'/**\n * ' +
		'\n * @source: <%= pkg.sources %>\n * ' + 
		'\n * @licstart  The following is the entire license notice for the' +
		'\n * JavaScript code in this page.\n * \n * <%= pkg.name %> - version <%= pkg.version %>' + 
		'\n * Build <%= pkg.buildNumber %> - <%= grunt.template.today("isoDateTime") %> ' + 
		'\n * Copyright 2017 <%= grunt.template.today("yyyy") %> wwwouaiebe ' + 
		'\n * Contact: https://www.ouaie.be/' + 
		'\n * License: <%= pkg.license %>' +
		'\n * \n * The JavaScript code in this page is free software: you can' +
		'\n * redistribute it and/or modify it under the terms of the GNU' +
		'\n * General Public License (GNU GPL) as published by the Free Software' +
		'\n * Foundation, either version 3 of the License, or (at your option)' +
		'\n * any later version.  The code is distributed WITHOUT ANY WARRANTY;' +
		'\n * without even the implied warranty of MERCHANTABILITY or FITNESS' +
		'\n * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.' +
		'\n * \n * As additional permission under GNU GPL version 3 section 7, you' +
		'\n * may distribute non-source (e.g., minimized or compacted) forms of' +
		'\n * that code without the copy of the GNU GPL normally required by' +
		'\n * section 4, provided you include this license notice and a URL' +
		'\n * through which recipients can access the Corresponding Source.' +
		'\n * \n * @licend  The above is the entire license notice' +
		'\n * for the JavaScript code in this page.' +
		'\n * \n */\n\n';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: { 
					'dist/RAZARA/tpl/401.html': 'src/tpl/401.html',
					'dist/RAZARA/tpl/403.html': 'src/tpl/403.html',
					'dist/RAZARA/tpl/404.html': 'src/tpl/404.html',
					'dist/RAZARA/tpl/archive.html': 'src/tpl/archive.html',
					'dist/RAZARA/tpl/archive_month.html': 'src/tpl/archive_month.html',
					'dist/RAZARA/tpl/categories.html': 'src/tpl/categories.html',
					'dist/RAZARA/tpl/category.html': 'src/tpl/category.html',
					'dist/RAZARA/tpl/home.html': 'src/tpl/home.html',
					'dist/RAZARA/tpl/page.html': 'src/tpl/page.html',
					'dist/RAZARA/tpl/post.html': 'src/tpl/post.html',
					'dist/RAZARA/tpl/tag.html': 'src/tpl/tag.html',
					'dist/RAZARA/tpl/tags.html': 'src/tpl/tags.html'
				}
				/*
				files: [
					{
					  expand: true,
					  cwd: 'src',
					  src: [ 'tpl/*.html'],
					  dest: 'dist/RAZARA'
					},
					{
					  expand: true,
					  cwd: 'src',
					  src: [ 'tpl/*.html'],
					  dest: 'dist/RAZARA4ouaie'
					}
				]
				*/
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'RAZARA4ouaie/',
						src: ['**'],
						dest: 'dist/RAZARA4ouaie'
					},
					{
						expand: true,
						cwd: 'src/pictures',
						src: ['**'],
						dest: 'dist/RAZARA4ouaie/pictures'
					},
					{
						expand: true,
						cwd: 'src/scripts',
						src: ['**'],
						dest: 'dist/RAZARA4ouaie/scripts'
					},
					{
						expand: true,
						cwd: 'src/styles',
						src: ['**'],
						dest: 'dist/RAZARA4ouaie/styles'
					}
				],
			}
		}
	});
	grunt.config.data.pkg.buildNumber = grunt.file.readJSON('buildNumber.json').buildNumber;
	grunt.config.data.pkg.buildNumber = ("00000" + ( Number.parseInt ( grunt.config.data.pkg.buildNumber ) + 1 )).substr ( -5, 5 ) ;
	grunt.file.write ( 'buildNumber.json', '{ "buildNumber" : "' + grunt.config.data.pkg.buildNumber + '"}'  );
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', [ 'htmlmin:dist','copy']);
	console.log ( '---------------------------------------------------------------------------------------------------------------------------------------------');
	console.log ( '\n                                     ' + grunt.config.data.pkg.name + ' - ' + grunt.config.data.pkg.version +' - build: '+ grunt.config.data.pkg.buildNumber + ' - ' + grunt.template.today("isoDateTime") +'\n' );
	console.log ( '---------------------------------------------------------------------------------------------------------------------------------------------');
};