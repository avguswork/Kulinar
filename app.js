//import {Question} from './question'


const form = document.querySelector('#form');
const recipename = form.querySelector('#recipeName');
const ingredients = form.querySelector('#ingredients');
const recipe = form.querySelector('#recipe');
const submitBtn = form.querySelector('#submit');

const btn = document.querySelector('#btn');
btn.addEventListener('click', answerServer);
const list = document.querySelector('#list');

form.addEventListener('submit', submitFormHandler)
//Получения инфо с инпута и отправка в БД
class Question {
    static create(question){
      return  fetch('https://avgus-site-default-rtdb.europe-west1.firebasedatabase.app/questions.json',
         {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'aplication/json'
            }

        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
        })
    }
}


function submitFormHandler(event) {
    event.preventDefault()
    
    const question = {
        recipename: recipename.value.trim(),
        ingredients: ingredients.value.trim(),
        recipe: recipe.value.trim(),


    }
    Question.create(question).then( () => {
        console.log('save to server')
        recipename.value = ''
        ingredients.value = ''
        recipe.value = ''
    })

    console.log('Question', question)
}

// Получения информации с БД
function answerServer(recipenameAnswer, ingredientsAnswer, recipeAnswer){
    fetch('https://avgus-site-default-rtdb.europe-west1.firebasedatabase.app/questions.json')
            .then(response => response.json())
            .then(response => {
                let answer = Object.keys(response).map(key => ({
                      ...response[key],
                      id : key
                  }))
                  
                  recipenameAnswer = (answer[2].recipename)
                  ingredientsAnswer = (answer[2].ingredients)
                  recipeAnswer = (answer[2].recipe)


                 console.log(recipenameAnswer, ingredientsAnswer, recipeAnswer)
                 answerRead(recipenameAnswer, ingredientsAnswer, recipeAnswer)
            })
             
        
}

//Вывод информации на сайт
function answerRead(recipenameAnswer, ingredientsAnswer, recipeAnswer) {
    const newH = document.createElement('h3');  
    newH.innerText = recipenameAnswer;    
    list.append(newH); 
    const newP = document.createElement('p'); 
    newP.innerText = ingredientsAnswer;
    newP.classList.add('white')     
    list.append(newP); 
    const newP2 = document.createElement('p');  
    newP2.innerText = recipeAnswer;    
    list.append(newP2); 

}


