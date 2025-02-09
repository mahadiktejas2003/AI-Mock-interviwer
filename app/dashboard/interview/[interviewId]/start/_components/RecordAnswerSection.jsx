'use client';
import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Mic, StopCircle } from 'lucide-react';
import Webcam from 'react-webcam';
import Image from 'next/image';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { chatSession } from '@/utils/GeminiAIModal';
import { toast } from 'sonner';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'; // Assuming Clerk is used for authentication
import moment from 'moment'; // Import moment for date formatting
import { db } from '@/utils/db';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const {
    transcript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  // Update userAnswer when finalTranscript changes
  useEffect(() => {
    if (finalTranscript) {
      setUserAnswer((prevAns) => prevAns + ' ' + finalTranscript);
      resetTranscript(); // Reset transcript after appending to userAnswer
    }
  }, [finalTranscript, resetTranscript]);

  // Save userAnswer to DB when recording stops and answer length > 10
  useEffect(() => {
    if (!listening && userAnswer.length > 10) {
      UpdateUserAnswerInDB();
    }
  }, [listening, userAnswer]);

  // Check browser support for speech recognition
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log('Your browser does not support speech recognition software! Try Chrome desktop.');
    return null;
  }

  // Start continuous speech recognition
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB',
    });
  };

  // Stop speech recognition
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // Toggle between start and stop recording
  const StartStopRecording = async () => {
    if (listening) {
      stopListening();
    } else {
      listenContinuously();
    }
  };
  // Show the user's answer in the console
  const showAnswer = () => {
    console.log('User Answer:', userAnswer); // Log the user's answer to the console
    alert(`Your Answer:\n${userAnswer}`); // Optionally display it in an alert box
  };


  // Save user answer and get feedback from AI
  const UpdateUserAnswerInDB = async () => {
      setLoading(true);

      // Prepare feedback prompt for AI
      const feedbackPrompt =
        'Question:' +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ', User Answer:' +
        userAnswer +
        '.Depends on question and user answer for given interview question, please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field.';

      // Send prompt to AI and get response
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace('```json', '').replace('```', '').trim();
      console.log(mockJsonResp);
      
      // Parse AI response into JSON
      const JsonFeedbackResp=JSON.parse(mockJsonResp);
      

      // Save feedback to the database
      const dbResponse = await db.insert(UserAnswer)
      .values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
        })

      if (dbResponse) {
        toast.success('User Answer recorded successfully');
      } 

      // Reset state
      setUserAnswer('');
   
      setLoading(false);
    }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image src="/webcam.png" width={200} height={200} className="absolute" alt="webcam" />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {listening ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
      <Button
        variant="outline"
        className="my-10"
        onClick={showAnswer}
        style={{ zIndex: 10, position: 'relative' }} // Ensure the button is not overlapped
      >
        <h2 className="text-primary flex gap-2 items-center">
          <Eye /> Show Answer
        </h2>
      </Button>
      
    </div>
  );
}

export default RecordAnswerSection; 