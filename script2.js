window.onload=function(){
    const startButton = document.getElementById('start-btn')
    const nextButton = document.getElementById('next-btn')
    const questionContainerElement = document.getElementById('question-container')
    let shuffledQuestions, currentQuestionIndex
    const questionElement = document.getElementById('question')
    const answerButtonsElement = document.getElementById('answer-buttons')

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
    setNextQuestion()
    }

    function setNextQuestion(){
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

     function showQuestion(question){
         questionElement.innerText = question.question
        // question.answers.forEach(answer => {
        //     const button = document.createElement('button')
        //     button.innerText = answer.text
        //     button.classList.add('btn')
        //     if(answer.correct){
        //         button.dataset.correct = answer.correct
        //     }
        //     button.addEventListener('click', selectAnswer)
        //     answerButtonsElement.appendChild(button)
        // })
        console.log(question)
        const button = document.createElement('button')
        let button2 = document.createElement('button')
        button.innerText = question.correct_answer
        question.incorrect_answers.map(a=>{
            button2 = a
        })
        console.log(button2)
        button.addEventListener('click', selectAnswer)
        button2.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
        answerButtonsElement.appendChild(button2)


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
        console.log(data)
        const questions = data.results
        startGame(questions)
        console.log('qs', questions)
      }
      fetchQuestions();

    const questions = [
        {
            question: 'What is 2 + 2',
            answers: [
                {text: '4', correct: true},
                {text: '22', correct: false}
            ]
        },
        {
            question: 'What is 5 + 2',
            answers: [
                {text: '7', correct: true},
                {text: '22', correct: false}
            ]
        }
    ]
}