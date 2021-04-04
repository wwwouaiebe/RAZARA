/*
Copyright - 2021 - wwwouaiebe - Contact: https://www.ouaie.be/

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

/**
@------------------------------------------------------------------------------------------------------------------------------

@file Nav.js
@copyright Copyright - 2021 - wwwouaiebe - Contact: https://www.ouaie.be/
@license GNU General Public License
@private

@------------------------------------------------------------------------------------------------------------------------------
*/

/**
@------------------------------------------------------------------------------------------------------------------------------

@module Nav
@private

@------------------------------------------------------------------------------------------------------------------------------
*/

/**
@------------------------------------------------------------------------------------------------------------------------------

@function myOnClickHeadingNav
@desc event listener for mouse click on heading
@param {object} the mouse event
@private

@------------------------------------------------------------------------------------------------------------------------------
*/

function myOnClickHeadingNav ( clickEvent ) {
	let show = clickEvent.target.classList.contains ( 'cyAddPlus' );
	document.querySelectorAll ( 'body > nav > h2' ).forEach (
		element => {
			element.classList.add ( 'cyAddPlus' );
			element.classList.remove ( 'cyAddMinus' );
		}
	);
	if ( show ) {
		clickEvent.target.classList.toggle ( 'cyAddPlus' );
		clickEvent.target.classList.toggle ( 'cyAddMinus' );
	}
}

/**
@------------------------------------------------------------------------------------------------------------------------------

@function navModifier
@desc Add class and event listeners on heading

@------------------------------------------------------------------------------------------------------------------------------
*/

function navModifier ( ) {
	document.querySelectorAll ( 'body > nav > h2' ).forEach (
		element => {
			element.classList.add ( 'cyAddPlus' );
			element.addEventListener ( 'click', myOnClickHeadingNav, false );
		}
	);
}

export {

	/**
	@--------------------------------------------------------------------------------------------------------------------------

	@desc Add class and event listeners on heading

	@--------------------------------------------------------------------------------------------------------------------------
	*/

	navModifier
};