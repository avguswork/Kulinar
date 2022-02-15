
const form = document.querySelector('#form');
form.addEventListener('submit', submitFormHandler);
const recipename = form.querySelector('#recipeName');
const ingredients = form.querySelector('#ingredients');
const recipe = form.querySelector('#recipe');
const submitBtn = form.querySelector('#submit');
const country = form.querySelector('#selectCountry');
const coock = form.querySelector('#selectCoock');
const catalogBlock = document.querySelector('#catalogBlock');
const getSelectCountry = document.querySelector('#getSelectCountry');
const getSelectCoock = document.querySelector('#getSelectCoock');
const getSelectRecipeName = document.querySelector('#getSelectRecipeName');
const child = document.querySelector('#child');


const buttonCatalog = document.querySelector('#buttonCatalog');
buttonCatalog.addEventListener('click', getCatalog);
const buttonSearch = document.querySelector('#buttonSearch');
buttonSearch.addEventListener('click', getSearch);
const getServerRecipeName = document.querySelector('#getServerRecipeName');
getServerRecipeName.addEventListener('click', getRecipeName);
const refresh = document.querySelector('#refresh');
refresh.addEventListener('click', reloadRecipeName);


function getRecipeName(){
    fetch('https://avgus-site-default-rtdb.europe-west1.firebasedatabase.app/questions.json')
        .then(response => response.json())
        .then(response => {
            let answer = Object.keys(response).map(key => ({
                ...response[key],
            }))
            for(let i = 0; i< answer.length; i++){
                res = Object.values(answer[i])
                
                recipenameAnswer = res[0]
                
                let beforeRecipeName = document.createElement('option')
                beforeRecipeName.innerText = recipenameAnswer
                getSelectRecipeName.append(beforeRecipeName)
            
            }
            
            
        })
        
}

//Обновления списка рецептов
function reloadRecipeName(answer){
    let country = getSelectCountry.value;
    let coock = getSelectCoock.value;
    console.log('start', getSelectRecipeName)
    //Видаленя списку получених рецептів//
    while(getSelectRecipeName.lastChild)
    getSelectRecipeName.removeChild(getSelectRecipeName.lastChild)
    
    
    fetch('https://avgus-site-default-rtdb.europe-west1.firebasedatabase.app/questions.json')
        .then(response => response.json())
        .then(response => {
            let answer = Object.keys(response).map(key => ({
                ...response[key],
            }))
            
    if(country !== '' && coock == ''){
        for(let i = 0; i< answer.length; i++){
            res = Object.values(answer[i])
            console.log(res[i])
            
         if(country == res[2]){       
                recipenameAnswer = res[0]
                let beforeRecipeName = document.createElement('option')
                beforeRecipeName.innerText = recipenameAnswer
                getSelectRecipeName.append(beforeRecipeName)
                console.log('2')
            }
        }
    }

     if(coock !== '' && country == ''){
        for(let i = 0; i< answer.length; i++){
            res = Object.values(answer[i])
         if(coock == res[1]){       
                recipenameAnswer = res[0]
                
                let beforeRecipeName = document.createElement('option')
                beforeRecipeName.innerText = recipenameAnswer
                getSelectRecipeName.append(beforeRecipeName)
                console.log('3')
            }
        }
    }

    if(coock !== '' && country !== ''){
        for(let i = 0; i< answer.length; i++){
            res = Object.values(answer[i])
         if(coock == res[1] && country == res[2]){       
                recipenameAnswer = res[0]
                
                let beforeRecipeName = document.createElement('option')
                beforeRecipeName.innerText = recipenameAnswer
                getSelectRecipeName.append(beforeRecipeName)
                console.log('3')
            }
        }
    }
    })
    
}


//Получения инфо с инпута и отправка в БД//
class Question {
    static create(question){
      return  fetch('https://avgus-site-default-rtdb.europe-west1.firebasedatabase.app/questions/.json', 
             {
            
            method: 'POST',
            body : JSON.stringify(question),
            headers: {'Content-Type': 'aplication/json'},
        })
        .then(response =>  response.json())
        .then(response => {
            console.log('Name', response)
        })
    }
}

function submitFormHandler(event) {
    event.preventDefault()

    const question = {
        aRecipename: recipename.value.trim(),
        bCoock: coock.value.trim(),
        cCountry : country.value.trim(),
        dIngredients: ingredients.value.trim(),
        eRecipe: recipe.value.trim(),


    }
    Question.create(question).then( () => {
        console.log('save to server')
        recipename.value = ''
        ingredients.value = ''
        recipe.value = ''
    })

    console.log('Question', question)
}

//Получения всех рецептов в каталог//
function getCatalog(){
    let catalogNum = 1;
    let searchNum = 0;
    answerServer (catalogNum, searchNum)
}
//Поиск рецепта//
function getSearch(){
    let searchNum = 1;
    let catalogNum = 0;
    answerServer (catalogNum, searchNum,)
}
// Получения информации с БД//
function answerServer (catalogNum, searchNum) {
    fetch('https://avgus-site-default-rtdb.europe-west1.firebasedatabase.app/questions.json')
        .then(response => response.json())
        .then(response => {
            let answer = Object.keys(response).map(key => ({
                ...response[key],
            }))
            if(catalogNum == 1){
                printCatalog(answer)
            }
            else{
                console.log('not data for catalog')
            }

            if(searchNum == 1){
                searchRecipe(answer)
            }
            else{
                console.log('not data for search')
            }
        
        })
}
// Продолжения действия для каталога//
function printCatalog(answer){
    console.log(answer)
    
        for(let i = 0; i< answer.length; i++){
        res2 = Object.values(answer[i])
                    
        recipenameAnswer = res2[0]
        coockAnswer = res2[1]
        countryAnswer = res2[2]
        ingredientsAnswer = res2[3]
        recipeAnswer = res2[4]

        answerRead(recipenameAnswer, coockAnswer, countryAnswer,  ingredientsAnswer, recipeAnswer,)
    }
    console.log(recipenameAnswer,  countryAnswer, coockAnswer, ingredientsAnswer, recipeAnswer,)
    scrollWindows()
}


//Поиск по названию(не полностью работает)
function searchRecipe(answer){
                  let country = getSelectCountry.value;
                  let coock = getSelectCoock.value;
                  let recipeName = getSelectRecipeName.value;
                      

                  for(let i = 0; i< answer.length; i++){
                    result = Object.values(answer[i])
//Вибрана країна //
                    if(country !== '' && coock == '' && recipeName == ''){
                        if(result[2] == country){
                            recipenameAnswer = result[0]
                            coockAnswer = result[1]
                            countryAnswer = result[2]
                            ingredientsAnswer = result[3]
                            recipeAnswer = result[4]
                            console.log(recipenameAnswer,  countryAnswer, coockAnswer, ingredientsAnswer, recipeAnswer,)
                            answerRead(recipenameAnswer, coockAnswer, countryAnswer,  ingredientsAnswer, recipeAnswer,)
                        }
                    }
//Вибраний вид//
                    else if(coock !== '' && country == '' && recipeName == ''){
                        if(result[1] == coock){
                            recipenameAnswer = result[0]
                            coockAnswer = result[1]
                            countryAnswer = result[2]
                            ingredientsAnswer = result[3]
                            recipeAnswer = result[4]
                            console.log(recipenameAnswer,  countryAnswer, coockAnswer, ingredientsAnswer, recipeAnswer,)
                            answerRead(recipenameAnswer, coockAnswer, countryAnswer,  ingredientsAnswer, recipeAnswer,)
                        }
                    }
//Вибраний рецепт//
                    else if(recipeName !== '' && coock == '' && country == ''){
                        if(result[0] == recipeName){
                            recipenameAnswer = result[0]
                            coockAnswer = result[1]
                            countryAnswer = result[2]
                            ingredientsAnswer = result[3]
                            recipeAnswer = result[4]
                            console.log(recipenameAnswer,  countryAnswer, coockAnswer, ingredientsAnswer, recipeAnswer,)
                            answerRead(recipenameAnswer, coockAnswer, countryAnswer,  ingredientsAnswer, recipeAnswer,)
                        }
                    }
// Вибрана країна і вид//               
                    if(country !== '' && coock !== '' && recipeName == ''){
                        if(result[1] == coock && result[2] == country){
                            recipenameAnswer = result[0]
                            coockAnswer = result[1]
                            countryAnswer = result[2]
                            ingredientsAnswer = result[3]
                            recipeAnswer = result[4]
                            console.log(recipenameAnswer,  countryAnswer, coockAnswer, ingredientsAnswer, recipeAnswer,)
                            answerRead(recipenameAnswer, coockAnswer, countryAnswer,  ingredientsAnswer, recipeAnswer,)
                        }
                    }
//Вибраний вид і рецепт//
                    if(country == '' && coock !== '' && recipeName !== ''){
                        if(result[1] == coock && result[0] == recipeName){
                            recipenameAnswer = result[0]
                            coockAnswer = result[1]
                            countryAnswer = result[2]
                            ingredientsAnswer = result[3]
                            recipeAnswer = result[4]
                            console.log(recipenameAnswer,  countryAnswer, coockAnswer, ingredientsAnswer, recipeAnswer,)
                            answerRead(recipenameAnswer, coockAnswer, countryAnswer,  ingredientsAnswer, recipeAnswer,)
                        }
                    }
//Вибрана країна і рецепт//
                    if(country !== '' && coock == '' && recipeName !== ''){
                        if(result[0] == recipeName && result[2] == country){
                            recipenameAnswer = result[0]
                            coockAnswer = result[1]
                            countryAnswer = result[2]
                            ingredientsAnswer = result[3]
                            recipeAnswer = result[4]
                            console.log(recipenameAnswer,  countryAnswer, coockAnswer, ingredientsAnswer, recipeAnswer,)
                            answerRead(recipenameAnswer, coockAnswer, countryAnswer,  ingredientsAnswer, recipeAnswer,)
                        }
                    }
//Вибрана країна, вид і рецепт//
                    if(country !== '' && coock !== '' && recipeName !== ''){
                        if(result[1] == coock && result[2] == country && result[0] == recipeName){
                            recipenameAnswer = result[0]
                            coockAnswer = result[1]
                            countryAnswer = result[2]
                            ingredientsAnswer = result[3]
                            recipeAnswer = result[4]
                            console.log(recipenameAnswer,  countryAnswer, coockAnswer, ingredientsAnswer, recipeAnswer,)
                            answerRead(recipenameAnswer, coockAnswer, countryAnswer,  ingredientsAnswer, recipeAnswer,)
                        }
                    }
                    
                


                }
                
                scrollWindows()

                
}               

//Вывод информации на сайт
function answerRead(recipenameAnswer, coockAnswer, countryAnswer,  ingredientsAnswer, recipeAnswer,) {
    const recept = document.createElement('div');
    recept.classList.add('recept');
    catalogBlock.append(recept);
    
    const receptText = document.createElement('div');
    receptText.classList.add('receptText');
    recept.append(receptText)
    
    const newH = document.createElement('h3');  
    newH.innerText = recipenameAnswer;    
    receptText.append(newH); 

    const newL = document.createElement('p');  
    newL.innerText = `Країна походження: ${countryAnswer} //  Вид страви: ${coockAnswer}`;   
    newL.classList.add('l') 
    receptText.append(newL); 

    const newP = document.createElement('p'); 
    newP.innerText = ingredientsAnswer;
    newP.classList.add('white')     
    receptText.append(newP); 
    const newP2 = document.createElement('p');  
    newP2.innerText = recipeAnswer;    
    newP2.classList.add('justify')
    receptText.append(newP2); 

}

//Скролинг вниз
function scrollWindows (){
    setTimeout(scroll, 100)
    const href = document.querySelector('#catalogBlock');
    
    function scroll(){
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }
}
