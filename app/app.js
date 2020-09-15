let tagsArray = []
let tagsContainer = document.querySelector('.tags-container')
let input = document.querySelector('input')
let clearBtn = document.querySelector('#clear-all')
let alerts = document.querySelector('.alerts')
let charLimit = 40

input.addEventListener('keyup', addTag)
clearBtn.addEventListener('click', clearAllTags)

function addTag(event) {
    const keyPressedIsEnter = event.key == 'Enter'
    const wordExists = tagsArray.includes(input.value.trim())
    const charIsMaxed = input.value.length >= charLimit

    if (keyPressedIsEnter && !wordExists) {
        input.value.split(",").forEach(element => {
            if (element) {
                tagsArray.push(element.trim())
            } 
        })
        updateTags()
        input.value = ''
    } else if (keyPressedIsEnter && wordExists) {
        popAlert("Error", `Tag "${input.value}" already added to the list`)
        updateTags()
        input.value = ''
    } else if (charIsMaxed) {
        popAlert("Warning", `Too many characters`)
    }
}

function updateTags() {
    clearTags()

    tagsArray.forEach(element => {
       tagsContainer.append(createTag(element)) 
    })

    if (tagsArray.length < 1) {
        clearBtn.style.display = "none"
    } else {
        clearBtn.style.display = "flex"
    }
}

function createTag(tag) {
    const div = document.createElement('div')
    div.classList.add('tag')

    const span = document.createElement('span')
    span.innerHTML = tag
    div.append(span)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.setAttribute('data-item', tag)
    deleteBtn.setAttribute('onClick', 'deleteTag(event)')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'
    span.append(deleteBtn)

    return div
}

function deleteTag(event) {
    const deleteBtn = event.currentTarget
    const item = deleteBtn.dataset.item

    const itemIndex = tagsArray.indexOf(item)
    tagsArray.splice(itemIndex, 1)

    updateTags()
}

function clearTags() {
    tagsContainer   
        .querySelectorAll('.tag')
        .forEach(element => element.remove())
}

function clearAllTags() {
    tagsArray = []
    updateTags()
}

function popAlert(title, message) { 
    let blueBG = "rgb(0, 132, 209)",
        yellowBG = "rgb(207, 188, 11)"

    const alertsContainer = alerts 

    const alertBox = document.createElement('div')
    alertBox.classList.add('alertbox')

    const alertTitle = document.createElement('h2')
    alertTitle.classList.add('alertbox-title')
    alertTitle.style.background = title == "Error" ? `${blueBG}` : `${yellowBG}`
    alertTitle.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        ${title}
    `
    alertBox.append(alertTitle)

    const alertMessage = document.createElement('span')
    alertMessage.classList.add('alertbox-message')
    alertMessage.innerHTML = message
    alertBox.append(alertMessage)

    alertsContainer.append(alertBox)
    alertBox.classList.add('slide-in-from-left')

    setTimeout(() => { 
        alertBox.classList.add('slide-out-to-top')
        setTimeout(() => {
            alertBox.style.display = "none"
        }, 100)
    }, 3250);
}



