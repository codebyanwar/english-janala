const lessonFunction=()=>{
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        displayLesson(data.data);
    })
}

const displayLesson=(lessons)=>{
    const lessonContainer= document.getElementById('level-container');
    lessonContainer.innerHTML= '';

    lessons.forEach(lesson=>{
        const lessonList= document.createElement('div');
        lessonList.innerHTML= `
            <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book"></i>lesson-${lesson.level_no}</button>
        `
        lessonContainer.appendChild(lessonList);
    })
}

lessonFunction();