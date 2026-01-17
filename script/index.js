const createElement=(arr)=>{
    const htmlElements = arr.map((el)=> `<span class='btn'>${el}</span>`);
    return htmlElements.join(' ');
};

const manageSpinner=(status)=>{
    if(status===true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
    }else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('card-container').classList.remove('hidden');
    }
}

const lessonFunction =()=>{
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
    .then (response=>response.json())
    .then(data=>{
        displayLesson(data.data);
    })
}

const removeActive=()=>{
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach(button=>button.classList.remove('active'))
}

const loadWord=(levelID)=>{
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${levelID}`
    fetch(url)
    .then(response=>response.json())
    .then(promiseData=>{
        removeActive();
        const lessonBTN = document.getElementById(`lesson-btn-${levelID}`);
        lessonBTN.classList.add('active');
        displayWordCard(promiseData.data);
    })
}

const loadWordDatils=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const rest= await fetch(url);
    const ditails = await rest.json();
    displayWordDatails(ditails.data);
}

// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }

const displayWordDatails=(word)=>{
    console.log(word);
    const cardDatailsContainer = document.getElementById('display-word-datils-container');
    cardDatailsContainer.innerHTML= `
        <div>
            <h2 class="text-2xl font-bold mb-5">${word.word} (<span class="bangla-font"><i class="fa-solid fa-microphone"></i> :${word.pronunciation} )</span></h2>
            <h3 class="text-xl font-semibold">Meaning</h3>
            <p class="text-lg bangla-font">${word.meaning}</p>
        </div>

        <div>
            <h3 class="text-xl font-semibold">Example</h3>
            <p class="text-lg">${word.sentence}</p>
        </div>

        <div>
            <p class="text-lg bangla-font mb-3">সমার্থক শব্দ গুলো</p>
            <div class="">${createElement(word.synonyms)}</div>
        </div>
    `;

    document.getElementById('card_modal').showModal();

    // words.forEach(word=>{
    //     console.log(word);
    // })
}

const displayLesson=(lessons)=>{
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML='';

    lessons.forEach(lesson=>{
        const createDiv = document.createElement('div');
        createDiv.innerHTML= `
            <button id='lesson-btn-${lesson.level_no}' onclick='loadWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book"></i>lesson- ${lesson.level_no}</button>
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
        `;
        manageSpinner(false);
        return;
    }

    words.forEach(word=>{
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML= `
            <div class="card py-10 px-8 flex flex-col items-center bg-white border border-solid border-[#422AD5]">
                <h2 class="text-[28px] mb-3 text-black font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="text-[16px] mb-10 text-black font-semibold">${word.pronunciation}</p>
                <h2 class="text-2xl text-[#18181B] bangla-font font-bold">${word.meaning ? word.meaning : "শব্দ পাওয়া যায়নি"}</h2>
                <div class="flex justify-between items-center mt-10 w-full">
                  <button onClick='loadWordDatils(${word.id})' class='text-[20px] bg-[#E7F3FE] px-4 py-3 rounded-lg hover:bg-[#422AD5] hover:text-white'><i class="fa-solid fa-circle-info"></i></button>
                  <button class='text-[20px] bg-[#E7F3FE] px-4 py-3 rounded-lg hover:bg-[#422AD5] hover:text-white'><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        cardContainer.append(wordDiv);
    })
    manageSpinner(false);
}

lessonFunction();