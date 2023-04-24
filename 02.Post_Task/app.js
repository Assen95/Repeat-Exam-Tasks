window.addEventListener("load", solve);

function solve() {
    const inputs = Array.from(document.querySelectorAll('input'))
    const contentInput = document.querySelector('#task-content')

    const allInputs = {
        titleInput: inputs[0],
        categoryInput: inputs[1],
        contentInput: contentInput,
    }

    const publishBtn = document.querySelector('#publish-btn')

    const reviewList = document.querySelector('#review-list')
    const publishList = document.querySelector('#published-list')

    publishBtn.addEventListener('click', publishTask)

    
    function publishTask(e){
        if(e){
            e.preventDefault()
        }

        const currentInputs = {
            curTitle: allInputs.titleInput.value,
            curCategory: allInputs.categoryInput.value,
            curContent: allInputs.contentInput.value,
        }

        const allInputsHaveValue = Object.values(allInputs).every((input) => input.value != '')
        if(!allInputsHaveValue){
            console.log('fill the blanks')
            return
        }

        let newLi = document.createElement('li')
        newLi.classList.add('rpost')
        let article = document.createElement('article')
        article.appendChild(createElementWithContext('h4', `${allInputs.titleInput.value}`))
        article.appendChild(createElementWithContext('p', `Category: ${allInputs.categoryInput.value}`))
        article.appendChild(createElementWithContext('p', `Content: ${allInputs.contentInput.value}`))

        const editBtn = createElementWithContext('button', 'Edit')
        editBtn.classList.add('action-btn')
        editBtn.classList.add('edit')
        editBtn.addEventListener('click', editTask)

        const postBtn = createElementWithContext('button', 'Post')
        postBtn.classList.add('action-btn')
        postBtn.classList.add('post')
        postBtn.addEventListener('click', postTask)

        newLi.appendChild(article)
        newLi.appendChild(editBtn)
        newLi.appendChild(postBtn)

        reviewList.appendChild(newLi)

        clearAllInputs()

        function editTask(e){
            e.currentTarget.parentNode.remove()
            allInputs.titleInput.value = currentInputs.curTitle
            allInputs.categoryInput.value = currentInputs.curCategory
            allInputs.contentInput.value = currentInputs.curContent
        }
    }

    function postTask(e){
        const parentLi = e.currentTarget.parentNode
        const liChildren = Array.from(parentLi.children)
        liChildren[1].remove()
        liChildren[2].remove()

        publishList.appendChild(parentLi)

    }

    function createElementWithContext(tag, text){
        let el = document.createElement(tag)
        el.textContent = text
        return el
    }

    function clearAllInputs(){
        Object.values(allInputs).forEach((input) => input.value = '')
    }
}