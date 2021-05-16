class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number == '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand == '') return;
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(curr)) return;

        switch(this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break 
            case '*':
                computation = prev * curr
                break 
            case '÷':
                computation = prev / curr
                break 
            default:
                return
        }

        this.currentOperand = computation
        this.previousOperand = ''
        this.operation = undefined
    }

    getDisplayNum(number){
        const stringNumber = number.toString()
        const integerNumber = parseFloat(stringNumber.split('.')[0])
        const decimalNumber = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerNumber)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerNumber.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if(decimalNumber != null){
            return `${integerDisplay}.${decimalNumber}`
        }
        else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNum(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNum(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete')
const previousOperandTextElement = document.querySelector('[data-prev-op]')
const currentOperandTextElement = document.querySelector('[data-curr-op]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {   
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {
        calculator.chooseOperation(operation.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})



