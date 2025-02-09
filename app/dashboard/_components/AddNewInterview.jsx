"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '../../../utils/GeminiAIModal';
import { Loader2 } from 'lucide-react';
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, YOE:${jobExperience},
    Depends on Job Position, Job Description & Years of Experince,give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with Answers in JSON Format,
    Give us Questions and Answers field in JSON`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '');
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + resp[0]?.mockId);
      }
    } else {
      console.log('ERROR');
    }

    setLoading(false);
  };

  return (
    <div>
      {user ? (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
              <h2 className='text-lg text-center'>+Add New</h2>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
              <DialogDescription>
                <div>
                  <h2>Add Details about your job position/role, Job description and years of experience</h2>
                  <form onSubmit={onSubmit}>
                    <div className="mt-7 my-3">
                      <label>Job Role/Job Position</label>
                      <Input placeholder='Ex. Full Stack Developer' required onChange={(event) => setJobPosition(event.target.value)} />
                    </div>
                    <div className="my-3">
                      <label>Job Description/ Tech Stack (In Short)</label>
                      <Textarea placeholder='Ex. React, Android, Nodejs, MySql etc.' required onChange={(event) => setJobDesc(event.target.value)} />
                    </div>
                    <div className="my-3">
                      <label>Years of Experience</label>
                      <Input placeholder='Ex.5' max="50" type='number' required onChange={(event) => setJobExperience(event.target.value)} />
                    </div>
                    <div className='flex gap-5 justify-end'>
                      <Button type="button" variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                      <Button type='submit' disabled={loading}>
                        {loading ? <><Loader2 className='animate-spin' />Generating from AI</> : 'Start Interview'}
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <p>Please sign in to add a new interview.</p>
      )}
    </div>
  );
}

export default AddNewInterview;