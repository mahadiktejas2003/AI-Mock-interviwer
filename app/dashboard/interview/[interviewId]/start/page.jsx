"use client" ;

import QuestionsSection from './_components/QuestionsSection';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview() {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]); // contains actual QnA in JSON response
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0); // many questions are there- now to show the active questions- use this state. In array 0th element, so it's a 1st question. once user clicks Next- then we've to increase the Active question index by 1 every time.
  const { interviewId } = useParams();

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));
    setInterviewData(result[0]);

    const jsonMockResp = await JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp.interviewQuestions|| []);
    setInterviewData(result[0]); // save interview data as result[0]
  };

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* QUESTIONS */}
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} />

        {/* VIDEO/AUDIO RECORDING */}
        <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/>
      </div>

      <div className='flex justify-end gap-6'>
        {activeQuestionIndex>0 && 
        <Button onClick={()=>{setActiveQuestionIndex(activeQuestionIndex-1)}}>Previous Question</Button>}
         {activeQuestionIndex!=mockInterviewQuestion?.length-1 && 
        <Button onClick={()=>{setActiveQuestionIndex(activeQuestionIndex+1)}}>Next Question</Button>}
         {activeQuestionIndex==mockInterviewQuestion?.length-1  && 
        <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
          <Button>End Interview</Button>
        </Link>}
      </div>

    </div>
  );
}

export default StartInterview;