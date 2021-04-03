/*
Copyright - 2019 - wwwouaiebe - Contact: http//www.ouaie.be/

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

/* eslint-disable-next-line no-magic-numbers */
const N_3M5 = 3 * 5;
/* eslint-disable-next-line no-magic-numbers */
const N_8EXP2 = 8 ** 2;
const ONE = 1;
const ZERO = 0;

function onMailContinueButtonFRClick ( ) {
	if ( N_8EXP2 + N_3M5 === Number.parseInt ( document.getElementById ( 'cyNumberFR' ).value ) ) {
		let addr = document.querySelector ( '#cyMailContinueButtonFR' ).getAttribute ( 'name' ) +
			String.fromCharCode ( N_8EXP2 ) +
			window.location.hostname.split ( '.' ).reverse ( ) [ ONE ] +
			'.' +
			window.location.hostname.split ( '.' ).reverse ( ) [ ZERO ];
		{
			let mailLink = document.createElement ( 'a' );
			mailLink.href = 'mailto:' + addr;
			mailLink.click ( );
		}
		navigator.clipboard.writeText ( addr )
			.then (
				( ) => {
					document.getElementById ( 'cyClipboardFR' ).innerHTML =
						'L\'adresse mail a également été passée dans le presse-papier de votre ordinateur.';
				}
			)
			.catch ( ( ) => console.error ( 'failed to copy to the clipboard' ) );
		document.getElementById ( 'cyMailFR' ).innerHTML =
			'Bravo! Vous êtes doué. Patientez un instant, votre mail va s\'ouvrir... ' +
			'si tout est bien configuré sur votre appareil.';
	}
	else {
		document.getElementById ( 'cyMailFR' ).innerHTML = 'Oufti biesse. Null en math.';
	}
	document.getElementById ( 'cyMailContinueButtonFR' ).style.visibility = 'hidden';
	document.getElementById ( 'cyMailContinueButtonEN' ).style.visibility = 'hidden';
}

function onMailContinueButtonENClick ( ) {
	if ( N_8EXP2 + N_3M5 === Number.parseInt ( document.getElementById ( 'cyNumberEN' ).value ) ) {
		let addr = document.querySelector ( '#cyMailContinueButtonEN' ).getAttribute ( 'name' ) +
			String.fromCharCode ( N_8EXP2 ) +
			window.location.hostname.split ( '.' ).reverse ( ) [ ONE ] +
			'.' +
			window.location.hostname.split ( '.' ).reverse ( ) [ ZERO ];
		{
			let mailLink = document.createElement ( 'a' );
			mailLink.href = 'mailto:' + addr;
			mailLink.click ( );
		}
		navigator.clipboard.writeText ( addr )
			.then (
				( ) => {
					document.getElementById ( 'cyClipboardEN' ).innerHTML =
						'The email address has also been passed to your computer\'s clipboard.';
				}
			)
			.catch ( ( ) => console.error ( 'failed to copy to the clipboard' ) );
		document.getElementById ( 'cyMailEN' ).innerHTML =
			'Excellent! You are very good. Wait a moment, your email will open...' +
			' if everything is configured correctly on your device.';
	}
	else {
		document.getElementById ( 'cyMailEN' ).innerHTML = 'You are stupid.';
	}
	document.getElementById ( 'cyMailContinueButtonFR' ).style.visibility = 'hidden';
	document.getElementById ( 'cyMailContinueButtonEN' ).style.visibility = 'hidden';
}

export { onMailContinueButtonFRClick, onMailContinueButtonENClick };