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
	default :
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

export { onStartSlideShow };