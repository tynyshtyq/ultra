'use client'

import { search } from '@/app/actions/Courses/search';
import { getBodies } from '@/app/actions/Studybody/getBodies';
import { update } from '@/app/actions/Studybody/update';
import { useCourses } from '@/contexts';
import { StudybodyType } from '@/entities/studybody';
import { UserType } from '@/entities/user';
import { Header } from '@/features';
import { LoadingPage } from '@/page';
import { Button, Loader, SVG, Text } from '@/shared/ui-library';
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
    console.log(JSON.parse(myAccount.regcourses).data);
    const [courses, setCourses] = useState<{title: string, abbr: string, school: string}[]>(JSON.parse(myAccount.regcourses).data)
    const [query, setQuery] = useState<string>('')
    const [searchResults, setSearchResults] = useState<any[]>();

    const [searchLoading, setSearchLoading] = useState(false)

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

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleCourseAdd = (abbr: string, title: string, school: string) => {
        setSearchResults(undefined);
        setQuery('');
        setSearchLoading(false);

        const newCourses = [...courses, {abbr, title, school}]
        update({bodyId: myAccount.id, updates: {regcourses: {data: newCourses}}})
        setCourses(newCourses);
    }

    const handleRemoveCourse = ({title, abbr} : {title: string, abbr: string}) => {
        const newCourses = courses.filter((course) => !(course.title === title && course.abbr === abbr))
        update({bodyId: myAccount.id, updates: {regcourses: {data: newCourses}}})
        setCourses(newCourses);
    }

    const handleSearch = async () => {
        setSearchLoading(true);
        const result = await search({query});
        setSearchResults(result.items.map((course) => {
            return {
                title: course.title, 
                abbr: course.abbr,
                school: course.school
            }
        }));
        setSearchLoading(false);
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
                        <div className='flex w-full gap-2 flex-wrap pt-2'>
                            <Text.Body>Your courses: </Text.Body>
                            {
                                courses.map((course, id) => {
                                    return  <div key={id} className='p-1 rounded-m border-m border-vista flex gap-2 items-center'>
                                                <Text.Body className='!text-[12px]'>{course.abbr} | {course.school}</Text.Body>
                                                <SVG.Cross className='w-3 h-3 cursor-pointer' onClick={()=> handleRemoveCourse({title: course.title, abbr: course.abbr})} />
                                            </div>
                                })
                            }
                        </div>
                        <div className='flex relative w-full z-[1]'>
                            <div className='flex gap-2 items-center relative'>
                                <input type="text" className='bg-[none] px-1 max-w-[155px] !text-[14px] outline-0 border-b-m border-vista border-opacity-50 focus:border-opacity-100' value={query} placeholder='Course name or abbr' onChange={handleQueryChange} />
                                {query && <SVG.Search className='cursor-pointer opacity-100 hover:opacity-50 w-5 h-5 absolute top-[50%] -translate-y-[50%] left-[calc(100%+.5rem)]' onClick={() => handleSearch()} /> }
                            </div>
                            
                            {
                                (searchLoading || searchResults) &&
                                <div className='absolute top-[calc(100%+.5rem)] left-0 w-max p-1 bg-[white] rounded shadow-lg flex flex-col items-start gap-1 max-h-[300px] overflow-y-scroll min-w-[200px] min-h-[100px] z-[14]'>
                                    {
                                        (searchLoading) ? 
                                            <Loader className='m-auto' />
                                        :
                                        searchResults && searchResults.length > 0 ? 
                                            
                                                searchResults.map((result, id) => {
                                                    return  <div className="hover:bg-ghost p-2 duration-100 w-full flex flex-col items-start gap-1 cursor-pointer" key={id} onClick={() => handleCourseAdd(result.abbr, result.title, result.school)}>
                                                                <Text.Body className='!text-[12px]'>{result.abbr}</Text.Body>
                                                                <Text.Body className='!text-[12px] opacity-50'>{result.title}</Text.Body>
                                                                <Text.Body className='!text-[12px] opacity-50'>{result.school}</Text.Body>
                                                            </div>
                                                })

                                            :

                                            <Text.Body className='!text-[12px] m-auto'>Please check input data</Text.Body>
                                    }
                                </div>
                            }
                        </div>
                        
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