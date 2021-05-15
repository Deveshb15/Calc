const keys = document.getElementById('calculator')
const display = document.getElementById('display')
const previousKeyType = keys.dataset.previousKeyType

keys.addEventListener('click', e=> {
    if(e.target.matches('button')){
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent

        Array.from(key.parentNode.children)
          .forEach(k => k.classList.remove('is-depressed'))

        if(!action){
            if (displayedNum == 0 || previousKeyType == 'operator'){
                display.textContent = keyContent
            }else{
                // console.log(prevKey);
                display.textContent = displayedNum + keyContent
            }
        }
        
        if(
        action == 'add'||
        action == 'sub'||
        action == 'mul'||
        action == 'div'
        ){
            key.classList.add('is-depressed')
            keys.dataset.previousKeyType = 'operator'
        }
        
        if (action === 'decimal') {
            display.textContent = displayedNum + keyContent
        }
        
        if (action === 'clear') {
            display.textContent = '0'
        }
        
        if (action === 'calculate') {
            console.log('equal key!')
        }

        if (action === 'del') {
            console.log('del');
        }
    }
})

function calculate(operator){
    if(operator){}
}