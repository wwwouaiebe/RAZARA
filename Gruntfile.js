module.exports = function ( grunt ) {
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
	grunt.initConfig ( {
		pkg : grunt.file.readJSON ( 'package.json' ),
		eslint : {
			options : {
				fix : true
			},
			target : [ 'src/scripts/*.js' ]
		},
		rollup : {
			Default : {
				options : {
					format : 'iife'
				},
				files : {
					'dist/RAZARA4ouaie/scripts/razara.js' : [ 'src/scripts/Main.js' ],
					'dist/RAZARA4anthisnes/scripts/razara.js' : [ 'src/scripts/Main.js' ]
				}
			}
		},
		terser : {
			RAZARA : {
				options : {
					mangle : true,
					output : {
						preamble : banner
					}
				},
				files : {
					'dist/RAZARA4ouaie/scripts/razara.min.js' : [ 'dist/RAZARA4ouaie/scripts/razara.js' ],
					'dist/RAZARA4anthisnes/scripts/razara.min.js' : [ 'dist/RAZARA4anthisnes/scripts/razara.js' ]
				}
			}
		},
		stylelint : {
			options : {
				fix : true
			},
			src : [ 'src/**/*.css' ]
		},
		cssmin : {
			options : {
				mergeIntoShorthands : false,
				roundingPrecision : -1
			},
			RAZARA4ouaie : {
				files : {
					'dist/RAZARA4ouaie/styles/razara.min.css' : [ 'src/styles/reset.css', 'src/styles/main.css', 'src/styles/pagination.css', 'src/styles/bigScreen.css', 'src/styles/mouse.css', 'src/styles/SlideShow.css' ]
				}
			},
			RAZARA4anthisnes : {
				files : {
					'dist/RAZARA4anthisnes/styles/razara.min.css' : [ 'src/styles/reset.css', 'src/styles/main.css', 'src/styles/pagination.css', 'src/styles/bigScreen.css', 'src/styles/mouse.css', 'src/styles/SlideShow.css' ]
				}
			}
		},
		htmlmin : {
			dist : {
				options : {
					removeComments : true,
					collapseWhitespace : true,
					conservativeCollapse : true,
					caseSensitive : true
				},
				files : [
					{
						expand : true,
						cwd : 'src',
						src : [ 'tpl/*.html' ],
						dest : 'dist/RAZARA4ouaie'
					},
					{
						expand : true,
						cwd : 'src',
						src : [ 'tpl/*.html' ],
						dest : 'dist/RAZARA4anthisnes'
					},
					{
						expand : true,
						cwd : 'src/RAZARA4ouaie',
						src : [ 'tpl/*.html' ],
						dest : 'dist/RAZARA4ouaie'
					},
					{
						expand : true,
						cwd : 'src/RAZARA4anthisnes',
						src : [ 'tpl/*.html' ],
						dest : 'dist/RAZARA4anthisnes'
					}
				]
			}
		},
		copy : {
			main : {
				files : [
					{
						expand : true,
						cwd : 'src/RAZARA4ouaie/locales/',
						src : [ '**/*.*' ],
						dest : 'dist/RAZARA4ouaie/locales'
					},
					{
						expand : true,
						cwd : 'src/RAZARA4ouaie/',
						src : [ '*.jpg', '*.php' ],
						dest : 'dist/RAZARA4ouaie'
					},
					{
						expand : true,
						cwd : 'src/pictures',
						src : [ '**' ],
						dest : 'dist/RAZARA4ouaie/pictures'
					},
					{
						expand : true,
						cwd : 'src/styles',
						src : [ '*.ttf', '*.png' ],
						dest : 'dist/RAZARA4ouaie/styles'
					},
					{
						expand : true,
						cwd : 'src',
						src : [ '*.php' ],
						dest : 'dist/RAZARA4ouaie'
					},
					{
						expand : true,
						cwd : 'src/RAZARA4anthisnes/locales/',
						src : [ '**/*.*' ],
						dest : 'dist/RAZARA4anthisnes/locales'
					},
					{
						expand : true,
						cwd : 'src/RAZARA4anthisnes/',
						src : [ '*.jpg', '*.php' ],
						dest : 'dist/RAZARA4anthisnes'
					},
					{
						expand : true,
						cwd : 'src/pictures',
						src : [ '**' ],
						dest : 'dist/RAZARA4anthisnes/pictures'
					},
					{
						expand : true,
						cwd : 'src/styles',
						src : [ '*.ttf', '*.png' ],
						dest : 'dist/RAZARA4anthisnes/styles'
					},
					{
						expand : true,
						cwd : 'src',
						src : [ '*.php' ],
						dest : 'dist/RAZARA4anthisnes'
					}
				]
			}
		}
	} );
	grunt.config.data.pkg.buildNumber = grunt.file.readJSON ( 'buildNumber.json' ).buildNumber;
	grunt.config.data.pkg.buildNumber = ( '00000' + ( Number.parseInt ( grunt.config.data.pkg.buildNumber ) + 1 ) ).substr ( -5, 5 );
	grunt.file.write ( 'buildNumber.json', '{ "buildNumber" : "' + grunt.config.data.pkg.buildNumber + '"}' );
	grunt.loadNpmTasks ( 'grunt-eslint' );
	grunt.loadNpmTasks ( 'grunt-rollup' );
	grunt.loadNpmTasks ( 'grunt-terser' );
	grunt.loadNpmTasks ( 'grunt-stylelint' );
	grunt.loadNpmTasks ( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks ( 'grunt-contrib-htmlmin' );
	grunt.loadNpmTasks ( 'grunt-contrib-copy' );
	grunt.registerTask ( 'default', [ 'eslint', 'rollup', 'terser', 'stylelint', 'cssmin:RAZARA4ouaie', 'cssmin:RAZARA4anthisnes', 'htmlmin:dist', 'copy' ] );
	console.log ( '---------------------------------------------------------------------------------------------------------------------------------------------' );
	console.log ( '\n                                     ' + grunt.config.data.pkg.name + ' - ' + grunt.config.data.pkg.version + ' - build: ' + grunt.config.data.pkg.buildNumber + ' - ' + grunt.template.today ( 'isoDateTime' ) + '\n' );
	console.log ( '---------------------------------------------------------------------------------------------------------------------------------------------' );
};