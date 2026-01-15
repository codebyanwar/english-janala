const lessonFunction =()=>{
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
    .then (response=>response.json())
    .then(data=>{
        displayLesson(data.data);
    })
}

const loadWord=(levelID)=>{
    const url = `https://openapi.programming-hero.com/api/level/${levelID}`
    fetch(url)
    .then(response=>response.json())
    .then(promiseData=>{
        displayWordCard(promiseData.data);
    })
}

const displayLesson=(lessons)=>{
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML='';

    lessons.forEach(lesson=>{
        const createDiv = document.createElement('div');
        createDiv.innerHTML= `
            <button onclick='loadWord(${lesson.level_no})' class="btn btn-outline btn-primary"><i class="fa-solid fa-book"></i>lesson- ${lesson.level_no}</button>
        `
        levelContainer.append(createDiv);
    })
}

const displayWordCard=(words)=>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML= '';

    if(words.length===0){
        cardContainer.innerHTML=`
            <div class="bg-[#F8F8F8] rounded-xl p-10 text-center col-span-3 space-y-8">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-4xl">নেক্সট Lesson এ যান</h2>
            </div>
        `
    }

    words.forEach(word=>{
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML= `
            <div class="card py-10 px-8 flex flex-col items-center bg-white border border-solid border-[#422AD5]">
                <h2 class="text-[28px] mb-3 text-black font-bold">${word.word}</h2>
                <p class="text-[16px] mb-10 text-black font-semibold">${word.pronunciation}</p>
                <h2 class="text-2xl text-[#18181B] bangla-font font-bold">${word.meaning}</h2>
                <div class="flex justify-between items-center mt-10 w-full">
                  <button class='text-[20px] bg-[#E7F3FE] px-4 py-3 rounded-lg hover:bg-[#422AD5] hover:text-white'><i class="fa-solid fa-circle-info"></i></button>
                  <button class='text-[20px] bg-[#E7F3FE] px-4 py-3 rounded-lg hover:bg-[#422AD5] hover:text-white'><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        cardContainer.append(wordDiv);
    })

}

lessonFunction();