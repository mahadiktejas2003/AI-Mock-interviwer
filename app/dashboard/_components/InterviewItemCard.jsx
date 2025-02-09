import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({ interview }) {
    const router = useRouter();

    const onStart = () => {
        router.push(`/dashboard/interview/${interview?.mockId}`);
    };

    const onFeedbackPress = () => {
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
    };

    return (
        <div className='border shadow-md rounded-lg p-5 transition-transform duration-300 hover:scale-[1.02]'>
            <h2 className='font-bold text-primary text-xl'>{interview?.jobPosition}</h2>
            <h2 className='text-base text-gray-600 mt-1'>{interview?.jobExperience}</h2>
            <h2 className='text-sm text-gray-400 mt-2'>Created At: {interview.createdAt}</h2>

            <div className='flex justify-between mt-4 gap-4'>
                <Button
                    size='sm'
                    variant='outline'
                    className='w-full py-6 text-base'
                    onClick={onFeedbackPress}
                >
                    Feedback
                </Button>
                <Button
                    size='sm'
                    className='w-full py-6 text-base bg-primary hover:bg-primary/90'
                    onClick={onStart}
                >
                    Start
                </Button>
            </div>
        </div>
    );
}

export default InterviewItemCard;