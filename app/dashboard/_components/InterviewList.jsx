"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    // before displaying cardss with previous interview-  we need to fetch interview List for that user.
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);

    useEffect(() => {
      if (user?.primaryEmailAddress) {
          getInterviewList();
      }
  }, [user?.primaryEmailAddress]);
  
    console.log("User's primary email address:", user?.primaryEmailAddress?.emailAddress);

    const getInterviewList = async () => {
      try {
          const result = await db.select().from(MockInterview)
              .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
              .orderBy(desc(MockInterview.id));
          
          console.log("Full list of Interviews: ", result);
          setInterviewList(result);
      } catch (error) {
          console.error("Error fetching interviews:", error);
        }
    }

  return (
    <div>
      <h2 className='font-semibold text-xl'>Previous Mock Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
      {interviewList && interviewList.map((interview, index) => (
      <InterviewItemCard 
        interview={interview} //interview info passed
        key={index}/>
      ))}
      </div>
    </div>
  )
}

export default InterviewList