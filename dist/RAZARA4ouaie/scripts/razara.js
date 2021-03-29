(function () {
	'use strict';

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

	const co66 = 66;
	const co13 = 13;
	const AHAH = 186;
	const co114 = 114;
	const co117 = 117;
	const co111 = 111;
	const co106 = 106;
	const co110 = 110;
	const co98 = 98;
	const co3 = 3;
	const co205 = 2.05;
	const co1 = 1;
	const zer = 0;

	function onMailContinueButtonFRClick ( ) {
		let iSum = Number.parseInt ( document.getElementById ( 'cyNumberFR' ).value );
		if ( co66 + co13 === iSum ) {
			let arr = [ co114, co117, co111, co106, co110, co111, co98 ];
			arr.reverse ( );
			let addr =
				new TextDecoder ( ).decode ( new Uint8Array ( arr.concat ( [ Math.floor ( ( AHAH / co3 ) + co205 ) ] ) ) ) +
				window.location.hostname.split ( '.' ).reverse ( ) [ co1 ] +
				'.' +
				window.location.hostname.split ( '.' ).reverse ( ) [ zer ];
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
				'Bravo! Vous êtes doué. Patientez un instant, votre mail va s\'ouvrir.';
		}
		else {
			document.getElementById ( 'cyMailFR' ).innerHTML = 'Oufti biesse. Null en math.';
		}
		document.getElementById ( 'cyButtonFR' ).style.visibility = 'hidden';
		document.getElementById ( 'cyButtonEN' ).style.visibility = 'hidden';
	}

	function onMailContinueButtonENClick ( ) {
		let iSum = Number.parseInt ( document.getElementById ( 'cyNumberEN' ).value );
		if ( co66 + co13 === iSum ) {
			let arr = [ co114, co117, co111, co106, co110, co111, co98 ];
			arr.reverse ( );
			let addr =
				new TextDecoder ( ).decode ( new Uint8Array ( arr.concat ( [ Math.floor ( ( AHAH / co3 ) + co205 ) ] ) ) ) +
				window.location.hostname.split ( '.' ).reverse ( ) [ co1 ] +
				'.' +
				window.location.hostname.split ( '.' ).reverse ( ) [ zer ];
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
				'Excellent! You are very good. Wait a moment, your email will open.';
		}
		else {
			document.getElementById ( 'cyMailEN' ).innerHTML = 'You are stupid.';
		}
		document.getElementById ( 'cyButtonFR' ).style.visibility = 'hidden';
		document.getElementById ( 'cyButtonEN' ).style.visibility = 'hidden';
	}

	function onClickHeadingNav ( clickEvent ) {
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

	function navModifier ( ) {
		document.querySelectorAll ( 'body > nav > h2' ).forEach (
			element => {
				element.classList.add ( 'cyAddPlus' );
				element.addEventListener ( 'click', onClickHeadingNav, false );
			}
		);
	}

	const INVALID_INDEX = -1;

	const MIN_SLIDE_SHOW_DURATION = 2000;
	const MAX_SLIDE_SHOW_DURATION = 30000;
	const SLIDE_SHOW_INTERVAL = 1000;

	let myBackgroundDiv = null;
	let myArticles = null;
	let myCurrentArticle = null;
	let myArticleIndex = INVALID_INDEX;
	let myTimerId = null;
	let mySlideShowDuration = 10000;
	let mySlideShowActive = false;
	let myCloseButton = null;
	let myClonedArticle = null;

	function myCloseSlideShow ( ) {
		document.removeEventListener ( 'keydown', myOnKeyDown, true );
		document.body.removeChild ( myBackgroundDiv );
		document.body.classList.remove ( 'slideShow' );
		myBackgroundDiv = null;
		myArticles = null;
		myCurrentArticle = null;
		myArticleIndex = INVALID_INDEX;
		myTimerId = null;
		mySlideShowActive = false;
		myCloseButton = null;
		myClonedArticle = null;
	}

	function myShowNextSlide ( ) {
		if ( myCurrentArticle ) {
			myBackgroundDiv.removeChild ( myClonedArticle );
		}
		myArticleIndex ++;
		myCurrentArticle = myArticles.item ( myArticleIndex );
		if ( myCurrentArticle ) {
			myClonedArticle = myCurrentArticle.cloneNode ( true );
			myBackgroundDiv.appendChild ( myClonedArticle );
			myTimerId = setTimeout ( myShowNextSlide, mySlideShowDuration );
		}
		else {
			myCloseSlideShow ( );
		}
	}

	function myPauseSlideShow ( ) {
		if ( myTimerId ) {
			window.clearTimeout ( myTimerId );
			myTimerId = null;
		}
		mySlideShowActive = false;
	}

	function myOnKeyDown ( keyBoardEvent ) {
		switch ( keyBoardEvent.key ) {
		case 'Escape' :
		case 'Esc' :
			myCloseSlideShow ( );
			break;
		case '+' :
			mySlideShowDuration =
				MAX_SLIDE_SHOW_DURATION === mySlideShowDuration
					?
					MAX_SLIDE_SHOW_DURATION
					: mySlideShowDuration + SLIDE_SHOW_INTERVAL;
			break;
		case '-' :
			mySlideShowDuration =
				MIN_SLIDE_SHOW_DURATION === mySlideShowDuration
					?
					MIN_SLIDE_SHOW_DURATION
					:
					mySlideShowDuration - SLIDE_SHOW_INTERVAL;
			break;
		case 'ArrowDown' :
			console.log ( keyBoardEvent.key );
			if ( mySlideShowActive ) {
				myPauseSlideShow ( );
			}
			break;
		case 'ArrowUp' :
			console.log ( keyBoardEvent.key );
			if ( ! mySlideShowActive ) {
				mySlideShowActive = true;
				myShowNextSlide ( );
			}
			break;
		case 'ArrowRight' :
			if ( myTimerId ) {
				window.clearTimeout ( myTimerId );
				myTimerId = null;
			}
			myShowNextSlide ( );
			break;
		case 'ArrowLeft' :
			if ( myTimerId ) {
				window.clearTimeout ( myTimerId );
				myTimerId = null;
			}
			myShowNextSlide ( );
			break;
		}
	}

	function onStartSlideShow ( ) {
		document.removeEventListener ( 'keydown', myOnKeyDown, true );
		document.addEventListener ( 'keydown', myOnKeyDown, true );
		document.body.classList.add ( 'slideShow' );
		myBackgroundDiv = document.createElement ( 'div' );
		document.body.appendChild ( myBackgroundDiv );

		myCloseButton = document.createElement ( 'div' );
		myCloseButton.innerText = '❌';
		myCloseButton.addEventListener ( 'click', myCloseSlideShow );
		myBackgroundDiv.appendChild ( myCloseButton );

		myArticles = document.querySelectorAll ( 'section > article' );
		mySlideShowActive = true;
		myShowNextSlide ( );
	}
	console.log ( 'slideshow 19' );

	let mailContinueButtonFR = document.getElementById ( 'cyMailContinueButtonFR' );
	if ( mailContinueButtonFR && onMailContinueButtonFRClick ) {
		mailContinueButtonFR.addEventListener ( 'click', onMailContinueButtonFRClick );
	}

	let mailContinueButtonEN = document.getElementById ( 'cyMailContinueButtonEN' );
	if ( mailContinueButtonEN && onMailContinueButtonENClick ) {
		mailContinueButtonEN.addEventListener ( 'click', onMailContinueButtonENClick );
	}

	document.querySelector ( '#cyPaginationSlideShow' ).addEventListener ( 'click', onStartSlideShow );
	navModifier ( );

}());
