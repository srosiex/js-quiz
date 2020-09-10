//for score subtract point when incorrect

window.onload=function(){
    const startButton = document.getElementById('start-btn')
    const nextButton = document.getElementById('next-btn')
    const questionContainerElement = document.getElementById('question-container')
    const scoreContainer = document.getElementById('score-container')
    let shuffledQuestions, currentQuestionIndex, shuffledAnswers
    const questionElement = document.getElementById('question')
    const answerButtonsElement = document.getElementById('answer-buttons')
    let score = 0;
    let questions = [];


    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', ()=>{
        currentQuestionIndex++
        setNextQuestion()
    })
    

    function startGame(questions) {
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    }

    function setNextQuestion(){
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

     function showQuestion(question){
        questionElement.innerText = question.question.replace(/&quot;/g,'"')
        let answers = [];
        let correct = {}
        let incorrect = {}

        correct = {'correct': question.correct_answer }
        answers.push(correct)

        question.incorrect_answers.map(a=>{
            incorrect = {'incorrect': a}
            answers.push(incorrect)
        })

        shuffledAnswers = answers.sort(() => Math.random() - .5)


        for(let obj of shuffledAnswers){
            const button = document.createElement('button')
            answer = []
            for(let value in obj){
                button.innerText = obj[value].replace(/&quot;/g,'"')
                button.classList.add('btn')
                answer.push(obj[value])
            }

            for(let key in obj){
                if(key === 'correct'){
                    button.dataset.correct = key
                }else{
                    button.dataset.incorrect = key
                }
            }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)
        }
    }

    function resetState(){
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild){
            answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
    }

    function selectAnswer(e){
        const selectedButton = e.target

        const correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })
        if(shuffledQuestions.length > currentQuestionIndex +1){
           nextButton.classList.remove('hide')
        }else{
            startButton.innerText = "restart"
            startButton.classList.remove('hide')
            nextButton.classList.add('hide')
        }
      if(correct){
          score++
      }else{
          score = score - 1
      }
    }

    function setStatusClass(element, correct){
        clearStatusClass(element)
        if(correct){
            element.classList.add('correct')
        }else{
            element.classList.add('wrong')
        }
        nextButton.classList.remove('hide')
        // scoreElement.classList.remove('hide')
        scoreContainer.classList.remove('hide')
        scoreContainer.innerText = "Score: " + score
    }

    function clearStatusClass(element){
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }

    async function fetchQuestions() {
        let response = await fetch(
          "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple"
        );
        let data = await response.json();
        questions.push(data.results)
            console.log(questions)
            startGame(questions[0])
      }
      fetchQuestions()




}


