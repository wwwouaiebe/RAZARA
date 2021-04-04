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

@file Main.js
@copyright Copyright - 2021 - wwwouaiebe - Contact: https://www.ouaie.be/
@license GNU General Public License
@private

@------------------------------------------------------------------------------------------------------------------------------
*/

// imports
import { onMailContinueButtonFRClick, onMailContinueButtonENClick } from './Mail.js';
import { navModifier } from './Nav.js';
import { onStartSlideShow } from './SlideShow.js';

// loding event handlers for mail if needed
let mailContinueButtonFR = document.querySelector ( '#cyMailContinueButtonFR' );
if ( mailContinueButtonFR && onMailContinueButtonFRClick ) {
	mailContinueButtonFR.addEventListener ( 'click', onMailContinueButtonFRClick );
}

let mailContinueButtonEN = document.querySelector ( '#cyMailContinueButtonEN' );
if ( mailContinueButtonEN && onMailContinueButtonENClick ) {
	mailContinueButtonEN.addEventListener ( 'click', onMailContinueButtonENClick );
}

// loading event handler for slide show
let paginationSlideShow = document.querySelector ( '#cyPaginationSlideShow' );
if ( paginationSlideShow ) {
	paginationSlideShow.addEventListener ( 'click', onStartSlideShow );
}

// modifying the nav tag
navModifier ( );