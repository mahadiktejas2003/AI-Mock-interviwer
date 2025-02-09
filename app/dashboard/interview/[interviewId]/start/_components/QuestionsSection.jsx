import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({mockInterviewQuestion,activeQuestionIndex}) => {
  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else{alert("Sorry your Browser don't support Text-to-Speech")}
  }
    //prop - mockInterviewQuestion
  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {/* show number of questions */}
          {mockInterviewQuestion && mockInterviewQuestion.map((questions,index)=>( 
              <h2 key={index} className={`p-2 bg-secondary rounded-full
              text-xs md:text-sm text-center cursor-pointer 
              ${activeQuestionIndex===index ? 'bg-blue-800 text-white' : ''}`}>Question #{index+1}</h2> 
              /*as indexing of array starts from 0- > so do index+1*/
          ))}

      </div>
      {/*Showing the Questions*/}
      <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)} />
      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb/>
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  )
}

export default QuestionsSection