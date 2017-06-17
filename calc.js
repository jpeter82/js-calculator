
window.onload = function() {
    var buttons = document.querySelectorAll('#calculator td');
    var operators = ['+', '-', '*', '/', '%', '^'];
    var decimalAdded = false;

    function changeFormula(buttonValue, formulaValue) {
        if (operators.indexOf(buttonValue) > -1) {
            if (formulaValue != 'f' && operators.indexOf(formulaValue.slice(-1)) == -1) 
                formula.innerHTML += buttonValue;
            else if (formulaValue === 'f' && buttonValue === '-') {
				formula.innerHTML = buttonValue;
            }
            decimalAdded = false;
        }
        else {
            if (formula.innerHTML === 'f' && buttonValue != '=') {
                formula.innerHTML = buttonValue;
            }
            else if ((formula.innerHTML === 'f' && buttonValue == '=') || (formulaValue.slice(-1) === '=' && buttonValue == '=')) {
                return null;
            }
            else {
                formula.innerHTML += buttonValue;
            }
        }
    }

    function clear(display, formula, msg) {
        display.textContent = 0;
        formula.textContent = 'f';
        formula.className = 'hidden';
        msg.innerHTML = '';
        msg.className = 'hidden-error';
        decimalAdded = false;
    }

    function prepareFormulaValue(formulaValue) {
        var lastChar = formulaValue.slice(-1);
        formulaValue = formulaValue.replace(/e/g, Math.E).replace(/pi/g, Math.PI).replace(/\^/g, '**');
        // formulaValue = formulaValue.replace(/abs([^\)]+\))/g, 'Math.abs($1)').replace(/sqrt([^\)]+\))/g, 'Math.sqrt($1)');
        formulaValue = formulaValue.replace(/abs/g, 'Math.abs').replace(/sqrt/g, 'Math.sqrt');
        console.log(formulaValue);

        if (operators.indexOf(lastChar) > -1 || lastChar == '.')
			formulaValue = formulaValue.replace(/.$/, '');
        return formulaValue;
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function(event) {
            var display = document.querySelector('#result');
            var displayValue = display.textContent;
            var formula = document.querySelector('#formula');
            var formulaValue = formula.textContent;
            var lastChar = formulaValue.slice(-1);
            var buttonValue = this.querySelector('span').textContent;
            var msg = document.querySelector('#message');

            if (buttonValue === 'C') {
                clear(display, formula, msg);
            }
            else if (formulaValue.slice(-1) === '=') {
                return null;
            }
            else {
                switch (buttonValue) {
                    case '.':
                        if (!decimalAdded) {
                            formula.innerHTML += buttonValue;
                            decimalAdded = true;
                        }
                        break;
                    case '=':
                        changeFormula(buttonValue, formulaValue);
                        if (formulaValue !== 'f') {
                            validFormulaValue = prepareFormulaValue(formulaValue);
                            try {
                                display.innerHTML = eval(validFormulaValue);
                            }
                            catch (e) {
                                display.innerHTML = 'Error!'
                                msg.innerHTML = e;
                                msg.className = 'visible-error';
                            }
                        }
                        decimalAdded = false;
                        break;
                    case 'abs':
                        if (formulaValue !== 'f' && operators.indexOf(formulaValue.slice(-1)) == -1) {
                            formula.textContent = 'abs(' + formulaValue + ')';
                        }
                        break;
                    case 'sqrt':
                        if (formulaValue !== 'f' && operators.indexOf(formulaValue.slice(-1)) == -1) {
                            formula.textContent = 'sqrt(' + formulaValue + ')';
                        }
                        break;
                    case 'rnd':
                        if (formulaValue === 'f') {
                            formula.textContent = Math.floor(Math.random() * 100) + 1;
                        }
                        else if (operators.indexOf(formulaValue.slice(-1)) > -1) {
                            formula.textContent += Math.floor(Math.random() * 100) + 1;
                        }
                        if (!(formula.className == 'visible')) {
                            formula.className = 'visible';
                        }
                        break;
                    default:
                        changeFormula(buttonValue, formulaValue);
                        formulaValue = formula.textContent;
                        if (!(formula.className == 'visible') && formulaValue !== 'f') {
                            formula.className = 'visible';
                        }
                }
            }

		    event.preventDefault();
        }
    }
};
