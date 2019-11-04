/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
const Keyboard = {
  elements: {
    input: null,
    main: null,
    keysContainer: null,
    keysEventCode: [
      '192', '49', '50', '51', '52', '53', '54', '55', '56', '57', '48', '189', '187', '8',
      '9', '81', '87', '69', '82', '84', '89', '85', '73', '79', '80', '219', '221', '13',
      '20', '65', '83', '68', '70', '71', '72', '74', '75', '76', '186', '222',
      '16', '226', '90', '88', '67', '86', '66', '78', '77', '188', '190', '191',
      '17', '91', '18', '32'],
    keys: [],

  },

  eventHandlers: {
    oninput: null,
  },

  properties: {
    value: '',
    capsLock: false,
    shift: false,
    ctrl: false,
    lng: '',

    alphabetEn: {
      192: '`',
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9',
      48: '0',
      189: '-',
      187: '=',
      81: 'q',
      87: 'w',
      69: 'e',
      82: 'r',
      84: 't',
      89: 'y',
      85: 'u',
      73: 'i',
      79: 'o',
      80: 'p',
      219: '[',
      221: ']',
      65: 'a',
      83: 's',
      68: 'd',
      70: 'f',
      71: 'g',
      72: 'h',
      74: 'j',
      75: 'k',
      76: 'l',
      186: ':',
      222: ';',
      90: 'z',
      88: 'x',
      67: 'c',
      86: 'v',
      66: 'b',
      78: 'n',
      77: 'm',
      188: ',',
      190: '.',
      191: '/',
    },

    alphabetRu: {
      192: 'ё',
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9',
      48: '0',
      189: '-',
      187: '=',
      81: 'й',
      87: 'ц',
      69: 'у',
      82: 'к',
      84: 'е',
      89: 'н',
      85: 'г',
      73: 'ш',
      79: 'щ',
      80: 'з',
      219: 'х',
      221: 'ъ',
      65: 'ф',
      83: 'ы',
      68: 'в',
      70: 'а',
      71: 'п',
      72: 'р',
      74: 'о',
      75: 'л',
      76: 'д',
      186: 'ж',
      222: 'э',
      90: 'я',
      88: 'ч',
      67: 'с',
      86: 'м',
      66: 'и',
      78: 'т',
      77: 'ь',
      188: ',',
      190: '.',
      191: '/',
    },

  },
  initInput() {
    this.elements.input = document.createElement('textarea');
    this.elements.input.classList.add('textarea');
    this.elements.input.id = 'use-keyboard';
    this.elements.input.setAttribute('autofocus', 'true');
    document.body.appendChild(this.elements.input);
    this.properties.lng = 'EN';
  },

  initKeyboard() {
    // create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard--keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard--key');

    // add to DOM
    document.body.appendChild(this.elements.main);
    this.elements.main.appendChild(this.elements.keysContainer);

    // use keybord for element whith id use-keyboard
    const input = document.getElementById('use-keyboard');

    this.open((currentValue) => { input.value = currentValue; });

    document.addEventListener('keydown', (event) => {
      document.getElementById(event.keyCode).classList.add('keyboard--key-pushed');
    });

    document.addEventListener('keyup', (event) => {
      document.getElementById(event.keyCode).classList.remove('keyboard--key-pushed');
      this.properties.value = input.value;
    });
  },

  defineChar(lng, keyEventCode) {
    if (lng === 'EN') {
      return this.properties.alphabetEn[keyEventCode];
    }
    if (lng === 'RU') {
      return this.properties.alphabetRu[keyEventCode];
    }
    return this;
  },

  createKeys() {
    const fragment = document.createDocumentFragment();

    // creates HTML for icons
    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    this.elements.keysEventCode.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertBr = ['8', '13', '222', '191'].indexOf(key) !== -1; // includes true-false

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard--key');
      keyElement.id = key;

      switch (key) {
        case '8':
          keyElement.classList.add('keyboard--key_wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value
              .substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
            if (this.properties.shift === true) { this.toggleShift(); }
          });


          break;

        case '20':
          keyElement.classList.add('keyboard--key_wide', 'keyboard--key-activated');
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard--key-active', this.properties.capsLock);
            if (this.properties.shift === true) { this.toggleShift(); }
          });

          break;

        case '13':
          keyElement.classList.add('keyboard--key_wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
            if (this.properties.shift === true) { this.toggleShift(); }
          });

          break;

        case '32':
          keyElement.classList.add('keyboard--key_wide_extra');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            if (this.properties.shift === true) {
              this.properties.shift = false;
              this.properties.lng === 'EN' ? this.properties.lng = 'RU' : this.properties.lng = 'EN';
              this.initKeyboard();
            } else {
              this.properties.value += ' ';
              this.triggerEvent('oninput');
            }
          });

          break;

        case '16': // shift
          keyElement.classList.add('keyboard--key_wide');
          keyElement.innerHTML = createIconHTML('arrow_upward');

          keyElement.addEventListener('click', () => {
            this.toggleShift();
          });

          break;

        case '17':
          keyElement.classList.add('keyboard--key_wide');
          keyElement.textContent = 'Cntr';
          keyElement.addEventListener('click', () => {
            if (this.properties.shift === true) { this.toggleShift(); }
          });
          break;

        default:
          // eslint-disable-next-line no-case-declarations
          const keyChar = this.defineChar(this.properties.lng, key);
          keyElement.textContent = keyChar;

          keyElement.addEventListener('click', () => {
            if (this.properties.shift === true) {
              this.properties.value += keyChar.toUpperCase();
              this.toggleShift();
            } else {
              this.properties.value += keyChar;
            }
            this.triggerEvent('oninput');
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertBr) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },


  triggerEvent(handlerName) {
    this.eventHandlers[handlerName](this.properties.value);
  },

  setUpperCase() {
    if (this.properties.lng === 'EN') {
      for (const key of this.elements.keys) {
        if (key.id > 64 && key.id < 91) {
          key.textContent = key.textContent.toUpperCase();
        }
      }
    }

    if (this.properties.lng === 'RU') {
      for (const key of this.elements.keys) {
        if ((key.id > 64 && key.id < 91) || (['192', '186', '219', '221', '222'].includes(key.id))) {
          key.textContent = key.textContent.toUpperCase();
        }
      }
    }
  },

  setLowerCase() {
    if (this.properties.lng === 'EN') {
      for (const key of this.elements.keys) {
        if (key.id > 64 && key.id < 91) {
          key.textContent = key.textContent.toLowerCase();
        }
      }
    }

    if (this.properties.lng === 'RU') {
      for (const key of this.elements.keys) {
        if ((key.id > 64 && key.id < 91) || (['192', '186', '219', '221', '222'].includes(key.id))) {
          key.textContent = key.textContent.toLowerCase();
        }
      }
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    this.properties.capsLock ? this.setUpperCase() : this.setLowerCase();
  },

  toggleShift() {
    this.properties.shift = !this.properties.shift;
    this.properties.shift ? this.setUpperCase() : this.setLowerCase();
    document.getElementById('16').classList.toggle('keyboard--key-pushed', this.properties.shift);
  },

  toggleCtrl() {
    this.properties.ctrl = !this.properties.ctrl;
  },

  open(oninput) {
    this.eventHandlers.oninput = oninput;
  },

};


window.addEventListener('load', () => {
  Keyboard.initInput();
  Keyboard.initKeyboard();
});
