
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
		default :
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

export default theSlideShow;