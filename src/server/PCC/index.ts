

import { Agent } from 'https';

import fetch from 'node-fetch';
import qstring from 'query-string';

import type { RequestInit } from 'node-fetch';
import type { StringifiableRecord} from 'query-string';
import type { Course, RegistrarCourse, RegistrarSemester, RequestOptions } from './types';
import { SCHOOLS } from '@/shared/constants';

const getSchool = (school: string) => SCHOOLS[school] || school;

const httpsAgent = new Agent({
    rejectUnauthorized: false,
});

// Public Course Catalog
class PCC {
    private HOST: string;
    private LIMIT = 10;

    constructor(host: string) {
        this.HOST = host;
    }

    private serialise(data: StringifiableRecord) {
        const result = [];
        for (const x in data) {
            result.push(`${encodeURIComponent(x)}=${encodeURIComponent(String(data[x]))}`);
        }
        return result.join('&');
    }

    private async request<T = unknown>({ method, params }: RequestOptions) {
        const requestOptions: RequestInit = params ? {
            method: 'POST',
            body: this.serialise({
                ...params,
                method,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        } : {
            method: 'GET',
        };

        const url = params ? this.HOST : qstring.stringifyUrl({
            url: this.HOST,
            query: {
                method,
            },
        });

        const response = await fetch(url, {
            ...requestOptions,
            agent: httpsAgent,
        });

        return response.json() as unknown as T;
    }


    public async getSemesters() {
        const semesters: RegistrarSemester[] = await this.request({ method: 'getSemesters' });
        return semesters.map(({ ID, NAME }) => ({ label: NAME, value: ID }));
    }

    public async search(query: string, term = 763, level = '1', page = 1): Promise<{ items: Course[], cursor?: number }> {
        const result = await this.request<{ data: RegistrarCourse[], total: string }>({
            method: 'getSearchData',
            params: {
                'searchParams[formSimple]': 'false',
                'searchParams[limit]': this.LIMIT,
                'searchParams[page]': page,
                'searchParams[start]': 0,
                'searchParams[quickSearch]': query,
                'searchParams[sortField]': -1,
                'searchParams[sortDescending]': -1,
                'searchParams[semester]': term,
                'searchParams[schools]': '',
                'searchParams[departments]': '',
                'searchParams[levels][]': level,
                'searchParams[subjects]': '',
                'searchParams[instructors]': '',
                'searchParams[breadths]': '',
                'searchParams[abbrNum]': '',
                'searchParams[credit]': '',
            }
        });

        const items = result.data.map(({
            COURSEID,
            ABBR,
            ANTIREQ,
            COREQ,
            PREREQ,
            ACADEMICLEVEL,
            SCHOOL,
            SHORTDESC,
            DEPARTMENT,
            TITLE,
            CRECTS,
            LASTTAUGHT,
        }) => ({
            id: COURSEID,
            abbr: ABBR,
            preReq: PREREQ,
            antiReq: ANTIREQ,
            coReq: COREQ,
            academicLevel: ACADEMICLEVEL,
            school: getSchool(SCHOOL),
            description: SHORTDESC,
            department: DEPARTMENT,
            title: TITLE,
            credits: CRECTS,
            lastTaught: LASTTAUGHT,
        }));

        const hasNextPage = parseInt(result.total, 10) > page * this.LIMIT;

        return {
            items,
            ...(hasNextPage ? { cursor: page + 1 } : {}),
        };
    }

    public async getCourse(id: string): Promise<Course> {
        return this.request<RegistrarCourse>({
            method: 'getCourseDescription',
            params: {
                courseid: id,
            }
        }).then(({
            COURSEID,
            ABBR,
            ANTIREQ,
            COREQ,
            PREREQ,
            ACADEMICLEVEL,
            SCHOOL,
            SHORTDESC,
            DEPARTMENT,
            TITLE,
            CRECTS,
            LASTTAUGHT,
        }) => ({
            id: COURSEID,
            abbr: ABBR,
            preReq: PREREQ,
            antiReq: ANTIREQ,
            coReq: COREQ,
            academicLevel: ACADEMICLEVEL,
            school: getSchool(SCHOOL),
            description: SHORTDESC,
            department: DEPARTMENT,
            title: TITLE,
            credits: CRECTS,
            lastTaught: LASTTAUGHT,
        }));
    };
}

const pcc = new PCC('https://registrar.nu.edu.kz/my-registrar/public-course-catalog/json');

export default pcc;