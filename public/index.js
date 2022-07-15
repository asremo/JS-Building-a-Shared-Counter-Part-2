async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const confirmButton = document.querySelector('#confirm-button');
    const decrementButton = document.querySelector('#decrement-button');
    const inputField = document.querySelector('#user-init-value-setup');
    const response = await fetch('http://localhost:9001/counter');
    const result = await response.json();
    let countValue = result.value;
    let userInputValue = 0;

    function increment(){
        countValue++;
        countContainer.textContent = countValue;
    }

    function decrement(){
        countValue--;
        countContainer.textContent = countValue;
    }

    function handleInput(e) {
        userInputValue = e.target.value;
    }

    async function handleConfirm() {
        const response2 = await fetch('http://localhost:9001/counter', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                value: Number(userInputValue),
            }),
        });
        main();
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    inputField.addEventListener('input', handleInput)
    confirmButton.addEventListener('click', handleConfirm)

    countContainer.textContent = countValue;
}
main()