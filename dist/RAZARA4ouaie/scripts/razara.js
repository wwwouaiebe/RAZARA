(function () {
	'use strict';

	/* eslint-disable no-magic-numbers */

	class SlideShowDirection {

		static get backward ( ) { return -1; }

		static get noChange ( ) { return 0; }

		static get forward ( ) { return 1; }

		constructor ( ) {
			Object.freeze ( this );
		}

	}

	/* eslint-enable no-magic-numbers */

	class KeyDownEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( keyBoardEvent ) {
			switch ( keyBoardEvent.key ) {

			case 'S' :
			case 's' :
				this.#slideShow.stop ( );
				break;
			case '+' :
				this.#slideShow.increaseDuration ( );
				break;
			case '-' :
				this.#slideShow.decreaseDuration ( );
				break;
			case 'P' :
			case 'p' :
				this.#slideShow.pause ( );
				break;
			case 'ArrowRight' :
				this.#slideShow.showNextArticle ( SlideShowDirection.forward );
				break;
			case 'ArrowLeft' :
				this.#slideShow.showNextArticle ( SlideShowDirection.backward );
				break;
			}
		}
	}

	class MouseEnterHelpEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( mouseEnterEvent ) {
			this.#slideShow.onMouseEnterHelpButton ( mouseEnterEvent );
		}
	}

	class MouseLeaveHelpEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( mouseLeaveEvent ) {
			this.#slideShow.onMouseLeaveHelpButton ( mouseLeaveEvent );
		}
	}

	class MouseClickHelpEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( mouseLeaveEvent ) {
			this.#slideShow.onMouseclickHelpButton ( mouseLeaveEvent );
		}
	}

	class CloseButtonClickEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( ) {
			this.#slideShow.stop ( );
		}
	}

	class DecreaseButtonClickEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( ) {
			this.#slideShow.decreaseDuration ( );
		}
	}

	class IncreaseButtonClickEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( ) {
			this.#slideShow.increaseDuration ( );
		}
	}

	class PauseButtonClickEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( ) {
			this.#slideShow.pause ( );
		}
	}

	class MouseEnterOrMoveArticleEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( mouseEnterEvent ) {
			this.#slideShow.onMouseEnterOrMoveArticle ( mouseEnterEvent );
		}
	}

	class MouseLeaveArticleEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( mouseLeaveEvent ) {
			this.#slideShow.onMouseLeaveArticle ( mouseLeaveEvent );
		}
	}

	class MouseClickArticleEL {

		#slideShow;

		constructor ( slideShow ) {
			this.#slideShow = slideShow;
			Object.freeze ( this );
		}

		handleEvent ( mouseClickEvent ) {
			this.#slideShow.onMouseClickArticle ( mouseClickEvent );
		}
	}

	class SlideShow {

		#slideShowData;

		#backgroundHTMLElement;

		#articleHTMLElement;

		#helpHTMLElement;

		#slideShowImgHTMLElement;

		#slideShowLegendHTMLElement;

		#slideShowExifHTMLElement;

		#keyDownEL;

		#duration;

		#paused;

		#timerId;

		#direction;

		#slideShowIndex;

		// eslint-disable-next-line no-magic-numbers
		static get #MAX_SLIDE_SHOW_DURATION ( ) { return 30000; }

		// eslint-disable-next-line no-magic-numbers
		static get #SLIDE_SHOW_INTERVAL ( ) { return 1000; }

		// eslint-disable-next-line no-magic-numbers
		static get #MIN_SLIDE_SHOW_DURATION ( ) { return 2000; }

		// eslint-disable-next-line no-magic-numbers
		static get #DEFAULT_SLIDE_SHOW_DURATION ( ) { return 10000; }

		// eslint-disable-next-line no-magic-numbers
		static get #DINVALID_INDEX ( ) { return -1; }

		#createButtons ( ) {
			let toolbarHTMLElement = document.createElement ( 'div' );

			this.#backgroundHTMLElement.appendChild ( toolbarHTMLElement );

			const decreaseButton = document.createElement ( 'span' );
			decreaseButton.innerText = '➖';
			decreaseButton.addEventListener ( 'click', new DecreaseButtonClickEL ( this ) );
			toolbarHTMLElement.appendChild ( decreaseButton );

			const increaseButton = document.createElement ( 'span' );
			increaseButton.innerText = '➕';
			increaseButton.addEventListener ( 'click', new IncreaseButtonClickEL ( this ) );
			toolbarHTMLElement.appendChild ( increaseButton );

			const pauseButton = document.createElement ( 'span' );
			pauseButton.innerText = '⏯️';
			pauseButton.addEventListener ( 'click', new PauseButtonClickEL ( this ) );
			toolbarHTMLElement.appendChild ( pauseButton );

			const helpButton = document.createElement ( 'span' );
			helpButton.innerText = '❔ ';
			helpButton.addEventListener ( 'mouseenter', new MouseEnterHelpEL ( this ) );
			helpButton.addEventListener ( 'mouseleave', new MouseLeaveHelpEL ( this ) );
			helpButton.addEventListener ( 'click', new MouseClickHelpEL ( this ) );
			toolbarHTMLElement.appendChild ( helpButton );

			const closeButton = document.createElement ( 'span' );
			closeButton.innerText = '❌';
			closeButton.addEventListener ( 'click', new CloseButtonClickEL ( this ) );
			toolbarHTMLElement.appendChild ( closeButton );

			this.#helpHTMLElement = document.createElement ( 'div' );
			this.#helpHTMLElement.innerText =
	            'Touche clavier ⮞ ou clic sur photo à droite :\n passer à la photo suivante' +
	            '\n\nTouche clavier ⮜ ou clic sur photo à gauche :\n passer à la photo précédente' +
	            '\n\nTouche clavier - ou bouton ➖ :\n diminuer le temps de vision' +
	            '\n\nTouche clavier + ou bonton ➕:\n augmenter le temps de vision' +
	            '\n\nTouches clavier P ou p ou bouton ⏯️ :\n arrêter ou relancer le diaporama' +
	            '\n\nTouche clavier S ou s ou bouton ❌ :\n fermer le diaporama';
			this.#helpHTMLElement.classList.add ( 'cyHelpDiv' );
			this.#helpHTMLElement.classList.add ( 'cyHelpDivHidden' );
			toolbarHTMLElement.appendChild ( this.#helpHTMLElement );
		}

		#createHTMLElements ( ) {
			this.#backgroundHTMLElement = document.createElement ( 'div' );

			this.#createButtons ( );

			this.#articleHTMLElement = document.createElement ( 'article' );
			this.#articleHTMLElement.addEventListener ( 'mouseenter', new MouseEnterOrMoveArticleEL ( this ) );
			this.#articleHTMLElement.addEventListener ( 'mousemove', new MouseEnterOrMoveArticleEL ( this ) );
			this.#articleHTMLElement.addEventListener ( 'mouseleave', new MouseLeaveArticleEL ( this ) );
			this.#articleHTMLElement.addEventListener ( 'click', new MouseClickArticleEL ( this ) );
			this.#backgroundHTMLElement.appendChild ( this.#articleHTMLElement );

			let figure = document.createElement ( 'figure' );
			this.#articleHTMLElement.appendChild ( figure );

			this.#slideShowImgHTMLElement = document.createElement ( 'img' );
			figure.appendChild ( this.#slideShowImgHTMLElement );

			let figCaption = document.createElement ( 'figcaption' );
			figure.appendChild ( figCaption );

			this.#slideShowLegendHTMLElement = document.createElement ( 'p' );
			figCaption.appendChild ( this.#slideShowLegendHTMLElement );

			let mainExifHTMLElement = document.createElement ( 'p' );
			mainExifHTMLElement.className = 'cyPictureInfo';
			figCaption.appendChild ( mainExifHTMLElement );

			let cameraHTMLElement = document.createElement ( 'span' );
			cameraHTMLElement.innerText = '📷';
			mainExifHTMLElement.appendChild ( cameraHTMLElement );

			this.#slideShowExifHTMLElement = document.createElement ( 'span' );
			mainExifHTMLElement.appendChild ( this.#slideShowExifHTMLElement );
		}

		constructor ( ) {
			Object.freeze ( this );
			this.#slideShowData = document.getElementsByTagName ( 'ssimg' );
			let slideShowElement = document.querySelector ( '#cyPaginationSlideShow > a' );
			if ( slideShowElement ) {
				slideShowElement.textContent = 'Diaporama slideshow';
				slideShowElement.title = 'Lancer le diaporama';
			}
			this.#keyDownEL = new KeyDownEL ( this );
			this.#duration = SlideShow.#DEFAULT_SLIDE_SHOW_DURATION;
			this.#paused = false;
			this.#timerId = null;
			this.#direction = SlideShowDirection.forward;
			this.#slideShowIndex = SlideShow.#DINVALID_INDEX;
			this.#createHTMLElements ( );
		}

		increaseDuration ( ) {
			this.#duration =
				SlideShow.#MAX_SLIDE_SHOW_DURATION === this.#duration
					?
					SlideShow.#MAX_SLIDE_SHOW_DURATION
					:
					this.#duration + SlideShow.#SLIDE_SHOW_INTERVAL;
		}

		decreaseDuration ( ) {
			this.#duration =
				SlideShow.#MIN_SLIDE_SHOW_DURATION === this.#duration
					?
					SlideShow.#MIN_SLIDE_SHOW_DURATION
					:
					this.#duration - SlideShow.#SLIDE_SHOW_INTERVAL;
		}

		onMouseEnterHelpButton ( mouseEnterEvent ) {
			this.#helpHTMLElement.style.right = ( document.documentElement.clientWidth - mouseEnterEvent.clientX ) + 'px';
			this.#helpHTMLElement.classList.remove ( 'cyHelpDivHidden' );
		}

		onMouseLeaveHelpButton ( ) {
			this.#helpHTMLElement.classList.add ( 'cyHelpDivHidden' );
		}

		onMouseclickHelpButton ( ) {
			this.#helpHTMLElement.classList.toggle ( 'cyHelpDivHidden' );
		}

		onMouseEnterOrMoveArticle ( mouseEvent ) {
			let articleClientRect = this.#articleHTMLElement.getBoundingClientRect ( );
			// eslint-disable-next-line no-magic-numbers
			if ( articleClientRect.width / 2 > mouseEvent.clientX - articleClientRect.x	 ) {
				this.#articleHTMLElement.classList.remove ( 'cyCursorRight' );
				this.#articleHTMLElement.classList.add ( 'cyCursorLeft' );
			}
			else {
				this.#articleHTMLElement.classList.remove ( 'cyCursorLeft' );
				this.#articleHTMLElement.classList.add ( 'cyCursorRight' );
			}
		}

		onMouseLeaveArticle ( ) {
			this.#articleHTMLElement.classList.remove ( 'cyCursorRight' );
			this.#articleHTMLElement.classList.remove ( 'cyCursorLeft' );
		}

		onMouseClickArticle ( mouseClickEvent ) {
			let articleClientRect = this.#articleHTMLElement.getBoundingClientRect ( );
			this.showNextArticle (
				// eslint-disable-next-line no-magic-numbers
				( articleClientRect.width / 2 > mouseClickEvent.clientX - articleClientRect.x )
					?
					SlideShowDirection.backward
					: SlideShowDirection.forward
			);
		}

		showNextArticle ( direction ) {
			if ( this.#timerId ) {
				window.clearTimeout ( this.#timerId );
				this.#timerId = null;
			}

			this.#direction = SlideShowDirection.noChange === direction ? this.#direction : direction;

			this.#slideShowIndex += this.#direction;

			if ( SlideShow.#DINVALID_INDEX === this.#slideShowIndex ) {
				this.stop ( );
				return;
			}

			if ( this.#slideShowIndex === this.#slideShowData.length ) {
				this.stop ( );
				return;
			}

			const currentSlideShowData = this.#slideShowData [ this.#slideShowIndex ];

			let legend =
				currentSlideShowData.getAttribute ( 'cat' ) +
				', ' +
				currentSlideShowData.getAttribute ( 'date' );

			this.#slideShowImgHTMLElement.src = currentSlideShowData.getAttribute ( 'src' );
			this.#slideShowImgHTMLElement.title = legend;
			this.#slideShowImgHTMLElement.alt = legend;
			this.#slideShowImgHTMLElement.className = currentSlideShowData.getAttribute ( 'class' );

			this.#slideShowLegendHTMLElement.innerText = legend;

			let exifData = currentSlideShowData.getAttribute ( 'exif' );
			this.#slideShowExifHTMLElement.innerText = exifData ? exifData : '';

			if ( ! this.#paused ) {
				this.#timerId = setTimeout (
					( ) => this.showNextArticle ( SlideShowDirection.noChange ),
					this.#duration );
			}
		}

		async start ( ) {
			await document.body.requestFullscreen ();

			document.addEventListener ( 'keydown', this.#keyDownEL, true );
			document.body.classList.add ( 'slideShow' );
			document.body.appendChild ( this.#backgroundHTMLElement );

			this.showNextArticle ( SlideShowDirection.forward );
		}

		pause ( ) {
			if ( this.#timerId ) {
				window.clearTimeout ( this.#timerId );
				this.#timerId = null;
				this.#paused = true;
			}
			else {
				this.#paused = false;
				this.showNextArticle ( SlideShowDirection.noChange );
			}
		}

		async stop ( ) {
			if ( this.#timerId ) {
				window.clearTimeout ( this.#timerId );
				this.#timerId = null;
			}

			document.removeEventListener ( 'keydown', this.#keyDownEL, true );
			document.body.classList.remove ( 'slideShow' );
			document.body.removeChild ( this.#backgroundHTMLElement );

			this.#paused = false;
			this.#direction = SlideShowDirection.forward;
			this.#slideShowIndex = SlideShow.#DINVALID_INDEX;

			if ( document.fullscreenElement ) {
				await document.exitFullscreen ();
			}
		}
	}

	const theSlideShow = new SlideShow ( );

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

	/* eslint-disable-next-line no-magic-numbers */
	const N_3M5 = 3 * 5;
	/* eslint-disable-next-line no-magic-numbers */
	const N_8EXP2 = 8 ** 2;
	const ONE = 1;
	const ZERO = 0;

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function onMailContinueButtonFRClick
	@desc event listener for mouse click on the ContinueFR button.

	@------------------------------------------------------------------------------------------------------------------------------
	*/

	function onMailContinueButtonFRClick ( ) {

		// Vous ne comprenez rien? Normal, c'est fait pour...
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

	/**
	@------------------------------------------------------------------------------------------------------------------------------

	@function onMailContinueButtonENClick
	@desc event listener for mouse click on the ContinueEN button.

	@------------------------------------------------------------------------------------------------------------------------------
	*/

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
		paginationSlideShow.addEventListener (
			'click',
			( ) => { theSlideShow.start ( ); } );
	}

})();
