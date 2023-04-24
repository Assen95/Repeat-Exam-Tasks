function attachEvents(){
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks'

    const inputs = Array.from(document.querySelectorAll('input'))
    const form = document.querySelector('form')

    const allInputs = {
        courseTitle: inputs[0],
        courseType: inputs[1],
        courseDescrpiton: document.querySelector('#description'),
        teacherName: inputs[2],
    }

    const courseList = document.querySelector('#list')

    const loadCourseBtn = document.querySelector('#load-course')
    const addCourseBtn = document.querySelector('#add-course')
    const editCourseBtn = document.querySelector('#edit-course')

    loadCourseBtn.addEventListener('click', loadAllCourses)
    addCourseBtn.addEventListener('click', addCourse)
    editCourseBtn.addEventListener('click', actualEdit)

    function loadAllCourses(e){
        if(e){
            e.preventDefault()
        }

        clearHTML()

        fetch(`${BASE_URL}`)
            .then((response) => response.json())
            .then((courseData) => {
                for (const value of Object.values(courseData)) {
                    // console.log(value)
                    let newDiv = document.createElement('div')   
                    newDiv.classList.add('container')
                    newDiv.id = value._id

                    newDiv.appendChild(createElementWithContext('h2', `${value.title}`))
                    newDiv.appendChild(createElementWithContext('h3', `${value.teacher}`))
                    newDiv.appendChild(createElementWithContext('h4', `${value.type}`))
                    newDiv.appendChild(createElementWithContext('h4', `${value.description}`))

                    const editBtn = createElementWithContext('button', 'Edit Course')
                    editBtn.classList.add('edit-btn')
                    const finishBtn = createElementWithContext('button', 'Finish Course')
                    finishBtn.classList.add('finish-btn')

                    editBtn.addEventListener('click', editCourse)
                    finishBtn.addEventListener('click', deleteCourse)

                    newDiv.appendChild(editBtn)
                    newDiv.appendChild(finishBtn)

                    courseList.appendChild(newDiv)
                }
            })
    }

    function addCourse(e){
        e.preventDefault()

        // TODO: Check if empty fields neeeds to be checked!

        const course = {
            title: allInputs.courseTitle.value,
            type: allInputs.courseType.value,
            description: allInputs.courseDescrpiton.value,
            teacher: allInputs.teacherName.value,
        }

        fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(course)
        })
        .then(() => clearAllInputs())
        .then(() => loadAllCourses())
    }

    function editCourse(e){
        e.preventDefault()
        addCourseBtn.disabled = true
        editCourseBtn.disabled = false
        const parentLi = e.currentTarget.parentNode
        const id = parentLi.id
        form.id = id
        const liChildren = Array.from(parentLi.children)
        allInputs.courseTitle.value = liChildren[0].textContent
        allInputs.teacherName.value = liChildren[1].textContent
        allInputs.courseType.value = liChildren[2].textContent
        allInputs.courseDescrpiton.value = liChildren[3].textContent

        parentLi.remove()
    }

    function actualEdit(e){
        e.preventDefault()
        const form = e.currentTarget.parentNode
        const id = form.id

        const course = {
            title: allInputs.courseTitle.value,
            type: allInputs.courseType.value,
            description: allInputs.courseDescrpiton.value,
            teacher: allInputs.teacherName.value,
            _id: id,
        }

        fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(course)
        })
        .then(() => loadAllCourses())
        .then(() => clearAllInputs())
        .then(() => {
            addCourseBtn.disabled = false
            editCourseBtn.disabled = true
        })
    }

    function deleteCourse(e){
        e.preventDefault()
        const currentLi = e.currentTarget.parentNode
        
        fetch(`${BASE_URL}/${currentLi.id}`, {
            method: "DELETE",
        })
        .then(() => loadAllCourses())
    }

    function createElementWithContext(tag, text){
        let el = document.createElement(tag)
        el.textContent = text
        return el
    }

    function clearAllInputs(){
        Object.values(allInputs).forEach((input) => input.value = '')
    }

    function clearHTML(){
        courseList.innerHTML = ''
    }
}

attachEvents()