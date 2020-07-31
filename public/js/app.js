console.log('Client side javascriot file is loaded')

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')


messageTwo.textContent = ''
messageOne.textContent = ''



weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    messageTwo.textContent = 'loading ......'
    const location = search.value

    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {

        if(data.error){
            messageTwo.textContent = data.error

        }else {
            messageOne.textContent = data.Temperature + '. ' + data.forecast + ' . '+data.humidity + '.'
            messageTwo.textContent = data.location
        }

    })


})


} )