/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

__webpack_require__(1);

var startValue = 0;
var endValue = 8;

var cardList = ['sasha', 'riley', 'nicole', 'miamalkova', 'mia', 'madison', 'lana', 'johnny'];
cardList = cardList.concat(cardList);
var moves = void 0,
    matched = void 0,
    star = void 0,
    i = void 0,
    removedStar = void 0;
var cards = document.querySelectorAll('.card');
var restart = document.querySelector('.restart');
var stars = document.querySelectorAll('.stars li');
var timer = 0;
var cloneStar = [];
for (i = 0; i < 3; i++) {
    cloneStar[i] = stars[i].cloneNode(true);
}
var scorePanel = document.querySelector('.score-panel');
var time = document.querySelector('.time');
var movesDiv = document.querySelector('.moves');
var startButton = document.querySelector('#startButton');
restart.addEventListener('click', startGame);
startButton.addEventListener('click', function start() {
    var _this = this;

    this.removeEventListener('click', start);
    this.parentElement.classList.add('out');
    setTimeout(function () {
        _this.parentElement.classList.add('hidden');
    }, 2000);
    startGame();
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function startGame() {
    reset();
    clearsmt();
    set();
    if (document.querySelectorAll('.end-game').length) {
        var modal = document.querySelectorAll('.end-game');
        modal[modal.length - 1].style.display = "none";
    }
    var newCardList = shuffle(cardList);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = cards.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                index = _step$value[0],
                card = _step$value[1];

            card.setAttribute("data-img", newCardList[index]);
            card.style.backgroundColor = "#fff";
            card.addEventListener('click', checkCard);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function reset() {
    moves = matched = star = i = startValue;
    time.textContent = i;
    movesDiv.textContent = moves;
    var list = document.querySelector('.stars');
    list.innerHTML = "";
    cloneStar.forEach(function (el) {
        list.appendChild(el);
    });
    removedStar = 2;
}

function checkCard() {
    this.style.backgroundImage = 'url("./img/' + this.dataset.img + '.jpg")';
    this.classList.add('matching');
    var matchedCard = document.querySelectorAll('.matching');
    if (matchedCard.length == 2) {
        var blocker = document.createElement("div");
        blocker.classList.add("block-click");
        document.body.appendChild(blocker);
        matchedCard[0].classList.remove('matching');
        matchedCard[1].classList.remove('matching');
        moves++;
        movesDiv.textContent = moves;
        if (matchedCard[0].dataset.img === matchedCard[1].dataset.img) {
            matched++;
            matchedCard[0].removeEventListener('click', checkCard);
            matchedCard[1].removeEventListener('click', checkCard);
            document.body.removeChild(blocker);
            if (matched === endValue) endGame();
        } else {
            setTimeout(function () {
                matchedCard[0].style.backgroundImage = "";
                matchedCard[1].style.backgroundImage = "";
                document.body.removeChild(blocker);
            }, 500);
        }
        removeStar();
    }
}

function endGame() {
    var endGameModal = document.createElement("div");
    var scorePanelClone = scorePanel.cloneNode(true);
    clearsmt();
    endGameModal.classList.add("block-click", "end-game");
    var text = document.createTextNode('Score:');
    endGameModal.appendChild(text);
    endGameModal.appendChild(scorePanelClone);
    document.body.appendChild(endGameModal);
    endGameModal.querySelector('.restart').addEventListener('click', startGame);
}

function set() {
    timer = setInterval(changeTime, 1000);
}

function clearsmt() {
    clearInterval(timer);
}

function changeTime() {
    i++;
    time.textContent = i;
    removeStar();
}

function removeStar() {
    stars = document.querySelectorAll('.stars li');
    if ((moves === 17 || i === 41) && removedStar === 2) {
        stars[0].parentNode.removeChild(stars[0]);
        removedStar--;
    }
    if ((moves === 19 || i === 51) && removedStar === 1) {
        stars[0].parentNode.removeChild(stars[0]);
        removedStar--;
    }
    if ((moves === 24 || i === 120) && removedStar === 0) {
        stars[0].parentNode.removeChild(stars[0]);
        removedStar--;
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map