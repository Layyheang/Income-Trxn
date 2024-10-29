export const setValue = (data) => {
        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;
        const type = document.getElementById('itemType').value;
        data(name,amount,type)
        // console.log(setValue)
        
}
