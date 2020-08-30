//for score subtract point when incorrect

window.onload=function(){
    const startButton = document.getElementById('start-btn')
    const nextButton = document.getElementById('next-btn')
    const questionContainerElement = document.getElementById('question-container')
    const scoreElement = document.getElementById('score')
    let shuffledQuestions, currentQuestionIndex, shuffledAnswers
    const questionElement = document.getElementById('question')
    const answerButtonsElement = document.getElementById('answer-buttons')
    let score = 0;
    let correctPoints = 0;
    let incorrectPoints = 0;

    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', ()=>{
        currentQuestionIndex++
        setNextQuestion()
    })


    function startGame(questions) {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreElement.classList.remove('hide')
    setNextQuestion()
    scoreElement.innerText = score
    }

    function setNextQuestion(){
        console.log('score: ', `${score}`, 'correct: ', `${correctPoints}`, 'incorrect: ', `${incorrectPoints}`)
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
          score++,
          correctPoints++
      }else{
          score = score - 1,
          incorrectPoints++
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
        const questions = data.results
        startGame(questions)
      }
      fetchQuestions();

    // const questions = [
    //     {
    //         question: 'What is 2 + 2',
    //         answers: [
    //             {text: '4', correct: true},
    //             {text: '22', correct: false}
    //         ]
    //     },
    //     {
    //         question: 'What is 5 + 2',
    //         answers: [
    //             {text: '7', correct: true},
    //             {text: '22', correct: false}
    //         ]
    //     }
    // ]
}


