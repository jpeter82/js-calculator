
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

    function clear(display, formula) {
        display.textContent = 0;
        formula.textContent = 'f';
        formula.className = 'hidden';
        decimalAdded = false;
    }

    function prepareFormulaValue(formulaValue) {
        var lastChar = formulaValue.slice(-1);
        formulaValue = formulaValue.replace(/e/g, Math.E).replace(/pi/g, Math.PI).replace(/\^/g, '**');
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

            switch (buttonValue) {
                case 'C':
                    clear(display, formula);
                    break;
                case '.':
                    if (formulaValue.slice(-1) === '=') {
                        return null;
                    }

                    if (!decimalAdded) {
                        formula.innerHTML += buttonValue;
                        decimalAdded = true;
			        }
                    break;
                case '=':
                    if (formulaValue.slice(-1) === '=') {
                        return null;
                    }

                    changeFormula(buttonValue, formulaValue);
                    if (formulaValue !== 'f') {
                        validFormulaValue = prepareFormulaValue(formulaValue);
                        display.innerHTML = eval(validFormulaValue);
                    }
                    decimalAdded = false;
                    break;
                default:
                    if (formulaValue.slice(-1) === '=') {
                        return null;
                    }
                    changeFormula(buttonValue, formulaValue);
                    formulaValue = formula.textContent;
                    if (!(formula.className == 'visible') && formulaValue !== 'f') {
                        formula.className = 'visible';
                    }
            }

		    event.preventDefault();
        }
    }
};


