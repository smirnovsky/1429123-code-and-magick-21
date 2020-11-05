/* eslint-disable no-var */
'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var randomizer = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getArrayWizards = function (names, surnames, coatColors, eyesColors) {
  var arr = [];
  for (var i = 0; i < WIZARD_COUNT; i++) {
    arr.push({
      name: names[randomizer(names)] + ' ' + surnames[randomizer(surnames)],
      coatColor: coatColors[randomizer(coatColors)],
      eyesColor: eyesColors[randomizer(eyesColors)]
    });
  }
  return arr;
};

var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var similarListElement = userDialog.querySelector('.setup-similar-list');

var wizards = getArrayWizards(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATS, WIZARD_EYES);

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');


var getColors = function (classSetup, arr, obj) {
  var wizardSetup = document.querySelector('.setup-wizard');
  var setup = wizardSetup.querySelector(classSetup);
  setup.addEventListener('click', function () {
    var color = arr[randomizer(arr)];
    setup.style.fill = color;
    obj.setAttribute('value', color);
  });
};


var getColorBall = function (arr, obj) {
  var setup = document.querySelector('.setup-fireball-wrap');
  setup.addEventListener('click', function () {
    var color = arr[randomizer(arr)];
    setup.style.background = color;
    obj.setAttribute('value', color);
  });
};

var setValueForForm = function (name) {
  return document.querySelector('input[name="' + name + '"]');
};

getColors('.wizard-coat', WIZARD_COATS, setValueForForm('coat-color'));
getColors('.wizard-eyes', WIZARD_EYES, setValueForForm('eyes-color'));
getColorBall(FIREBALL_COLOR, setValueForForm('fireball-color'));
