'use client'

import { search } from '@/app/actions/Courses/search';
import { getBodies } from '@/app/actions/Studybody/getBodies';
import { update } from '@/app/actions/Studybody/update';
import { useCourses } from '@/contexts';
import { StudybodyType } from '@/entities/studybody';
import { UserType } from '@/entities/user';
import { Header } from '@/features';
import { LoadingPage } from '@/page';
import { SVG, Text } from '@/shared/ui-library';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

interface Props {
    user: UserType;
    myAccount: StudybodyType;
}

const StudyBodyPage: FC<Props> = ({ user, myAccount }) => {

    const [bodies, setBodies] = useState<StudybodyType[]>([]);

    const [account, setAccount] = useState<StudybodyType>(myAccount);
    const [active, setActive] = useState(myAccount.status);
    const [telegram, setTelegram] = useState(myAccount.telegram)

    const [loading, setLoading] = useState(false);

    const [courses, setCourses] = useState<string[]>([])
    const [query, setQuery] = useState<string>('')

    const [usernameEdit, setUsernameEdit] = useState(false);

    const { saved } = useCourses();

    useEffect(() => {
        setLoading(true)
        getBodies(null)
        .then((res) => {
            setBodies(res.filter((body: StudybodyType) => body.userId !== user.id))
        })
        .finally(() => {
            setLoading(false);
        })
    }, [])

    const handleTelegramChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.trim();
    
        let username = inputValue.startsWith('@') ? inputValue : '@' + inputValue;
    
        setTelegram(username);
    }

    const handleTelegramSave = async () => {
        saved(false)
        update({bodyId: myAccount.id, updates: {telegram}})
        .then((res) => {
            setAccount(res)
        })
        .finally(() => {
            saved(true);
            setUsernameEdit(false);
        })
    }

    const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        const result = await search({query: e.target.value})
        console.log(result);
        
    }

    const handleStatusUpdate = () => {
        update({bodyId: myAccount.id, updates: {status: !active}})
        setActive(!active);
    }

    if (loading) return <LoadingPage />
    
    return (
        <main className='w-full h-full'> 
            <Header user={user}/>

            <div className='w-full max-w-[800px] p-4 rounded-m shadow-lg mt-10 mx-auto flex flex-col items-center'>
                <div className='flex w-full items-start flex-col gap-2'>
                    <Text.Heading type='m'>{user.name}</Text.Heading>
                    {
                        usernameEdit ?
                            <div className='flex items-center gap-2'>
                                <input type="text" className='bg-[none] outline-0 border-b-m border-vista' value={telegram} onChange={handleTelegramChange} />
                                <SVG.Check className='w-4 h-4 !text-vista cursor-pointer' onClick={handleTelegramSave} />
                            </div>
                            
                        :
                            <div className='flex items-center gap-2 mb-2'>
                                <Text.Body className='opacity-50'>{account.telegram}</Text.Body>
                                <SVG.Pencil className='w-3 h-3 opacity-50 cursor-pointer' onClick={() => setUsernameEdit(true)} />
                            </div>
                            
                    }
                    <div className='flex items-center gap-4 pt-2 border-t-m border-vista w-full border-opacity-20'>
                        <Text.Body>Active: </Text.Body>
                        <button className={`w-[40px] rounded-[20px] border-m ${active ? '' : 'border-opacity-30'} relative h-[22px] border-vista`} onClick={handleStatusUpdate}>
                            <div className={`w-[20px] h-[20px] rounded-full absolute top-0 bg-vista ${active ? 'right-0' : 'opacity-30 left-0'}`} />
                        </button>
                    </div>
                    
                    <div className='flex w-full flex-col gap-4'>
                        <div className='flex w-full gap-2 flex-wrap'>
                            {
                                courses.map((course) => {
                                    return  <div className='p-2 rounded-m border-m border-vista '>
                                                <Text.Body>{course}</Text.Body>
                                            </div>
                                })
                            }
                        </div>
                        <input type="text" className='bg-[none] max-w-[150px] !text-[14px] outline-0 border-b-m border-vista' value={query} onChange={handleSearch} placeholder='Course name or abbr' />
                    </div>
                </div>
            </div>

            {
                bodies.map((body, id) => {
                    return  <div className='' key={id}> 
                                <Text.Body>{body.name}</Text.Body>
                            </div>
                })
            }

        </main>
    );
};

export default StudyBodyPage;