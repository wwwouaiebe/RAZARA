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
	const FORWARD = 1;
	const BACKWARD = -1;
	const TWO = 2;

	const MIN_SLIDE_SHOW_DURATION = 2000;
	const MAX_SLIDE_SHOW_DURATION = 30000;
	const SLIDE_SHOW_INTERVAL = 1000;
	const DEFAULT_SLIDE_SHOW_DURATION = 10000;

	let myBackgroundDiv = null;
	let myArticles = null;
	let myCurrentArticle = null;
	let myArticleIndex = INVALID_INDEX;
	let myTimerId = null;
	let myCloseButton = null;
	let myClonedArticle = null;
	let	myArticleClientRect = null;

	let mySlideShow = {
		active : false,
		paused : false,
		duration : DEFAULT_SLIDE_SHOW_DURATION,
		forward : true
	};

	function myCloseSlideShow ( ) {
		if ( myTimerId ) {
			window.clearTimeout ( myTimerId );
			myTimerId = null;
		}
		document.removeEventListener ( 'keydown', myOnKeyDown, true );
		document.body.removeChild ( myBackgroundDiv );
		document.body.classList.remove ( 'slideShow' );
		myBackgroundDiv = null;
		myCloseButton = null;

		myArticles = null;
		myCurrentArticle = null;
		myClonedArticle = null;
		myArticleIndex = INVALID_INDEX;

		myArticleClientRect = null;

		myTimerId = null;

		mySlideShow.active = false;
		mySlideShow.paused = false;
		mySlideShow.forward = true;
		sessionStorage.setItem ( 'slideShow', JSON.stringify ( mySlideShow ) );
	}

	function myOnArticleMouseMoveOrEnter ( mouseEvent ) {

		if ( myArticleClientRect.width / TWO < mouseEvent.clientX - myArticleClientRect.x	 ) {
			myClonedArticle.classList.remove ( 'cyCursorLeft' );
			myClonedArticle.classList.add ( 'cyCursorRight' );
		}
		else {
			myClonedArticle.classList.remove ( 'cyCursorRight' );
			myClonedArticle.classList.add ( 'cyCursorLeft' );
		}
	}

	function myOnArticleMouseLeave ( ) {
		myClonedArticle.classList.remove ( 'cyCursorRight' );
		myClonedArticle.classList.remove ( 'cyCursorLeft' );
	}

	function myOnArticleClick ( mouseEvent ) {
		if ( myArticleClientRect.width / TWO < mouseEvent.clientX - myArticleClientRect.x	 ) {
			if ( myTimerId ) {
				window.clearTimeout ( myTimerId );
				myTimerId = null;
			}
			myShowNextSlide ( );
		}
		else {
			if ( myTimerId ) {
				window.clearTimeout ( myTimerId );
				myTimerId = null;
			}
			mySlideShow.forward = false;
			myShowNextSlide ( );
		}
	}

	function myShowNextSlide ( ) {
		if ( myCurrentArticle ) {
			myClonedArticle.removeEventListener ( 'mousemove', myOnArticleMouseMoveOrEnter, false );
			myClonedArticle.removeEventListener ( 'mouseenter', myOnArticleMouseMoveOrEnter, false );
			myClonedArticle.removeEventListener ( 'mouseleave', myOnArticleMouseLeave, false );
			myClonedArticle.removeEventListener ( 'click', myOnArticleClick, false );
			myBackgroundDiv.removeChild ( myClonedArticle );
		}

		myArticleIndex += mySlideShow.forward ? FORWARD : BACKWARD;
		myCurrentArticle = myArticles.item ( myArticleIndex );
		if ( myCurrentArticle ) {
			myClonedArticle = myBackgroundDiv.appendChild ( myCurrentArticle.cloneNode ( true ) );
			if ( ! mySlideShow.paused ) {
				myTimerId = setTimeout ( myShowNextSlide, mySlideShow.duration );
			}
			myArticleClientRect = myClonedArticle.getBoundingClientRect ( );
			myClonedArticle.addEventListener ( 'mousemove', myOnArticleMouseMoveOrEnter, false );
			myClonedArticle.addEventListener ( 'mouseenter', myOnArticleMouseMoveOrEnter, false );
			myClonedArticle.addEventListener ( 'mouseleave', myOnArticleMouseLeave, false );
			myClonedArticle.addEventListener ( 'click', myOnArticleClick, false );
		}
		else {
			let paginationLink = document.querySelector (
				mySlideShow.forward ? '#cyPaginationPrevious > a' : '#cyPaginationNext > a' );
			if ( paginationLink ) {
				sessionStorage.setItem ( 'slideShow', JSON.stringify ( mySlideShow ) );
				paginationLink.click ( );
			}
			else {
				myCloseSlideShow ( );
			}
		}
		mySlideShow.forward = true;
	}

	function myOnKeyDown ( keyBoardEvent ) {
		switch ( keyBoardEvent.key ) {
		case 'Escape' :
		case 'Esc' :
			myCloseSlideShow ( );
			break;
		case '+' :
			mySlideShow.duration =
				MAX_SLIDE_SHOW_DURATION === mySlideShow.duration
					?
					MAX_SLIDE_SHOW_DURATION
					: mySlideShow.duration + SLIDE_SHOW_INTERVAL;
			break;
		case '-' :
			mySlideShow.duration =
				MIN_SLIDE_SHOW_DURATION === mySlideShow.duration
					?
					MIN_SLIDE_SHOW_DURATION
					:
					mySlideShow.duration - SLIDE_SHOW_INTERVAL;
			break;
		case 'ArrowDown' :
			if ( myTimerId ) {
				window.clearTimeout ( myTimerId );
				myTimerId = null;
			}
			mySlideShow.paused = true;
			break;
		case 'ArrowUp' :
			if ( mySlideShow.paused ) {
				mySlideShow.paused = false;
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
			mySlideShow.forward = false;
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
		myArticleIndex = mySlideShow.forward ? INVALID_INDEX : myArticles.length;
		mySlideShow.active = true;
		myShowNextSlide ( );
	}

	mySlideShow = JSON.parse ( sessionStorage.getItem ( 'slideShow' ) ) || mySlideShow;

	if ( mySlideShow.active ) {
		onStartSlideShow ( );
	}

	let mailContinueButtonFR = document.getElementById ( 'cyMailContinueButtonFR' );
	if ( mailContinueButtonFR && onMailContinueButtonFRClick ) {
		mailContinueButtonFR.addEventListener ( 'click', onMailContinueButtonFRClick );
	}

	let mailContinueButtonEN = document.getElementById ( 'cyMailContinueButtonEN' );
	if ( mailContinueButtonEN && onMailContinueButtonENClick ) {
		mailContinueButtonEN.addEventListener ( 'click', onMailContinueButtonENClick );
	}

	let paginationSlideShow = document.querySelector ( '#cyPaginationSlideShow' );
	if ( paginationSlideShow ) {
		paginationSlideShow.addEventListener ( 'click', onStartSlideShow );
	}

	navModifier ( );

}());
