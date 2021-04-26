import {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [question, setQuestion] = useState({
    id: '',
    title: '',
    firstOption: '',
    secondOption: '',
    firstOptionVoteCount: '',
    secondOptionVoteCount: '',
    answer: null // value will be option 1 or 2
  });

  const [loading, setLoading] = useState(false);

  const setNextQuestion = async() => {
    if(loading) return;
    setLoading(true);
    
    // Fetch data
    let res = await fetch('http://localhost:8000/api/random-question/');
    let data = await res.json();
    console.log(data);
    // Set Question
    setQuestion({
      id: data['id'],
      title: data['title'],
      firstOption: data['firstOption'],
      secondOption: data['secondOption'],
      firstOptionVoteCount: data['firstOptionVoteCount'],
      secondOptionVoteCount: data['secondOptionVoteCount'],
      answer: null
    })

    setLoading(false);
  }

  useEffect(() => {
    setNextQuestion()
  }, [])

  const questionOrLoading = () => {
    if(loading === true){
      return (
        "Would you rather..."
      )
    }else{
      if(!question.title || question.title.trim() === '' ){
        return (
          "Would you rather..."
        )
      }else {
        return (
          `${question.title}, would you rather...`
        )
      }
    }
  }

  const firstOptionOrLoading = () => {
    // console.log(question.answer);
    if(loading){
      return (
        <div className="lds-dual-ring"></div>
      )
    }else {
      if(question.answer === null){
        return (question.firstOption)
      }else {
        return (
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <div className="percentage-left-box">
                {
                  isNaN(Math.round(question.firstOptionVoteCount/(question.firstOptionVoteCount+question.secondOptionVoteCount)*100))
                  ? 0
                  :Math.round(question.firstOptionVoteCount/(question.firstOptionVoteCount+question.secondOptionVoteCount)*100)
                }
                %
                </div>
              <div className="subtitle-left-box">
                {question.firstOptionVoteCount}
                {
                  question.answer === 1?" agree":" disagree"
                }
              </div>
              <span className="secondary-text">{question.firstOption}</span>
            </div>
        )
      }
    }
  }

  const secondOptionOrLoading = () => {
    if(loading){
      return (
        <div className="lds-dual-ring"></div>
      )
    }else {
      if(question.answer === null){
        return (question.secondOption)
      }else {
        return (
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <div className="percentage-right-box">
                {
                  isNaN((100 - Math.round(question.firstOptionVoteCount/(question.firstOptionVoteCount+question.secondOptionVoteCount)*100)))
                  ? 0
                  :(100 - Math.round(question.firstOptionVoteCount/(question.firstOptionVoteCount+question.secondOptionVoteCount)*100))
                }
                %</div>
              <div className="subtitle-right-box">
                {question.secondOptionVoteCount}
                {
                  question.answer === 2?" agree":" disagree"
                }
              </div>
              <span className="secondary-text">{question.secondOption}</span>
            </div>
        )
      }
    }
  }

  const answerHandler = async(option) => {
    if(loading) return;
    if(question.answer !== null) return;
    // console.log(option);
    setQuestion({
      ...question,
      answer: option
    })
    // update vote
    setLoading(true);
    await fetch(`http://localhost:8000/api/upvote-option/${question.id}/`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({option})
    });
    // let data = await res.json();
    // console.log(data);
    setLoading(false);
  }

  return (
    <div className="wrapper">
      <div style={{marginTop:'20px', 'display':'flex', 'justifyContent': 'center'}}>
        <h1 className="header">Choose Wisely</h1>
        <button className="btn">Submit Question</button>
      </div>
      <hr style={{marginTop: '20px', border:'1px solid rgba(247, 240, 245, .5)' }}/>
      <p className="question">
        {
          questionOrLoading()
        }
      </p>
      <div className="box-wrapper">
        <div className="left-box" onClick={() => answerHandler(1)}>
          <span className="option-text">
            {
              firstOptionOrLoading()
            }
          </span>
        </div>
        <div className="middle-circle">
          <div className="option-text">or</div>
        </div>
        <div className="right-box" onClick={() => answerHandler(2)}>
          <span className="option-text">
            {
              secondOptionOrLoading()
            }
          </span>
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
        <button className="btn btn-next" disabled={loading} onClick={setNextQuestion}>Next</button>
      </div>
      <div className="copyright">Made with ❤️ by Sandip Sadhukhan.</div>
    </div>
  );
}

export default App;
