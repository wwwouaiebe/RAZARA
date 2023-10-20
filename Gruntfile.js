/*
Copyright - 2017 2023 - wwwouaiebe - Contact: https://www.ouaie.be/

This  program is free software;
you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation;
either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/* eslint-disable no-magic-numbers */
// eslint-disable-next-line no-undef
module.exports = function ( grunt ) {
	let banner =
		'/**\n * ' +
		'\n * @source: <%= pkg.sources %>\n * ' +
		'\n * @licstart  The following is the entire license notice for the' +
		'\n * JavaScript code in this page.\n * \n * <%= pkg.name %> - version <%= pkg.version %>' +
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
					'dist/RAZARA4ouaie/scripts/razara-1-1-3.min.js' : [ 'dist/RAZARA4ouaie/scripts/razara.js' ],
					'dist/RAZARA4anthisnes/scripts/razara-1-1-3.min.js' : [ 'dist/RAZARA4anthisnes/scripts/razara.js' ]
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
					'dist/RAZARA4ouaie/styles/razara-1-1-3.min.css' :
					[
						'src/styles/reset.css',
						'src/styles/main.css',
						'src/styles/pagination.css',
						'src/styles/bigScreen.css',
						'src/styles/mouse.css',
						'src/styles/SlideShow.css'
					]
				}
			},
			RAZARA4anthisnes : {
				files : {
					'dist/RAZARA4anthisnes/styles/razara-1-1-3.min.css' :
					[
						'src/styles/reset.css',
						'src/styles/main.css',
						'src/styles/pagination.css',
						'src/styles/bigScreen.css',
						'src/styles/mouse.css',
						'src/styles/SlideShow.css'
					]
				}
			}
		},
		htmlcleancompress : {
			anthisnes : {
				options : {
					clean : true,
					src : 'src/tpl',
					dest : 'dist/RAZARA4anthisnes/tpl'
				}
			},
			ouaie : {
				options : {
					clean : true,
					src : 'src/tpl',
					dest : 'dist/RAZARA4ouaie/tpl'
				}
			},
			anthisnesOnly : {
				options : {
					clean : false,
					src : 'src/RAZARA4anthisnes/tpl',
					dest : 'dist/RAZARA4anthisnes/tpl'
				}
			},
			ouaieOnly : {
				options : {
					clean : false,
					src : 'src/RAZARA4ouaie/tpl',
					dest : 'dist/RAZARA4ouaie/tpl'
				}
			}
		},
		essimpledoc : {
			release : {
				options : {
					src : './src/scripts',
					dest : './docs/techDoc',
					validate : true
				}
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
						src : [ '*.ttf', '*.woff2', '*.png' ],
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
						src : [ '*.ttf', '*.woff2', '*.png' ],
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
	grunt.config.data.pkg.buildNumber =
		( '00000' + ( Number.parseInt ( grunt.config.data.pkg.buildNumber ) + 1 ) ).slice ( -5 );
	grunt.file.write ( 'buildNumber.json', '{ "buildNumber" : "' + grunt.config.data.pkg.buildNumber + '"}' );
	grunt.loadNpmTasks ( 'grunt-eslint' );
	grunt.loadNpmTasks ( 'grunt-rollup' );
	grunt.loadNpmTasks ( 'grunt-terser' );
	grunt.loadNpmTasks ( 'grunt-wwwouaiebe-stylelint' );
	grunt.loadNpmTasks ( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks ( 'grunt-htmlcleancompress' );
	grunt.loadNpmTasks ( 'grunt-contrib-copy' );
	grunt.loadNpmTasks ( 'grunt-essimpledoc' );
	grunt.registerTask (
		'debug',
		[
			'eslint',
			'rollup',
			'terser',
			'stylelint',
			'cssmin:RAZARA4ouaie',
			'cssmin:RAZARA4anthisnes',
			'htmlcleancompress',
			'copy'
		]
	);
	grunt.registerTask (
		'release',
		[
			'eslint',
			'rollup',
			'terser',
			'stylelint',
			'cssmin:RAZARA4ouaie',
			'cssmin:RAZARA4anthisnes',
			'htmlcleancompress',
			'copy',
			'essimpledoc'
		]
	);
	/* eslint-disable no-console */
	console.log ( '-------------------------------------------------------------------------------------------------------' );
	console.log (
		'\n                                     ' +
		grunt.config.data.pkg.name +
		' - ' +
		grunt.config.data.pkg.version +
		' - build: ' + grunt.config.data.pkg.buildNumber +
		' - ' +
		grunt.template.today ( 'isoDateTime' ) + '\n' );
	console.log ( '-------------------------------------------------------------------------------------------------------' );
};