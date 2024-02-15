import type { ReactNode } from 'react';
import { CourseType } from '../../types';

export type WeekDay = 'M' | 'T' | 'W' | 'R' | 'F' | 'S';


const WEEKDAYS = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY'
] as const;

const COLORS = [
    '#DA3A2D',
    '#EC804F',
    '#ECC059',
    '#7BCA8F',
    '#65A6DA',
    '#9060EE',
    '#3F51B5',
    '#8E24AA',
    '#616161'
];

const COURSE_ABBR_TITLE_REGEXP = /([A-Z]{3,4} \d{3}[A-Z]?) (.*?)</;

type RegistrarDay = {
    TIME: string;
} & Record<typeof WEEKDAYS[number], string>;

const parseDay = (input: string) => {
    const b = input.split('<br>');

    const match = input.match(COURSE_ABBR_TITLE_REGEXP);

    if (!match) throw new Error('Invalid course format');

    const abbr = match[1]!;
    const label = match[2]!;

    return {
        name: label,
        title: b[1]!.split(' /')[0]!,
        credits: b[2]!,
        professor: b[3]!,
        cab: b[4]!,
        abbr: abbr.replace(' ', ''),
    };
};


export const parseScheduleToCourse = (json: string) => {

    const data = JSON.parse(json) as RegistrarDay[];
    
    const courses: {[key: string]: CourseType} = {};
    
    const parsed: any[]= [];
    
    data.forEach((d) => {
        WEEKDAYS.forEach((w) => {
            if (d[w]) {
                parsed.push(parseDay(d[w]))
            }
        })
    })

    let i = 0;

    parsed.forEach((info) => {
        if (courses[info.name]) {
            return;
        }
        else {
            const course: CourseType = {
                name: info.name,
                abbr: info.abbr,
                credits: info.credits,
                color: COLORS[i],
            }
            courses[info.name] = course;
            i += 1;
        }
    })

    return {
        data: courses
    };
};




export type Courses = ReturnType<typeof parseScheduleToCourse>;