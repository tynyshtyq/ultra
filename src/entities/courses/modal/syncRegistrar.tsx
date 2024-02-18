import { Agent } from 'https';

import makeFetchCookie from 'fetch-cookie';
import fetch, {RequestInfo, RequestInit, Response} from 'node-fetch';
import { CookieJar } from 'tough-cookie';
import queryString from 'query-string';
import { scheduleTypeResolver } from './utils/scheduleTypeResolver';
import { parseScheduleToCourse } from './utils/parseScheduleToCourse';

const HOST = 'https://registrar.nu.edu.kz';
const BUILD_ID = 'form-tFAqQhbP6TRrM1eFFrnkFOGsb2ExDtyBNHcywT3RB8s';

type SyncResult = {
    courses: ReturnType<typeof parseScheduleToCourse>;
};

export class Registrar {
    private HOST = HOST;
    private BUILD_ID = BUILD_ID;
    private jar: CookieJar;
    private agent: Agent;
    // Use the correct type for fetch enhanced with cookies
    private fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
    // Correctly type the request method
    private request: (url: RequestInfo, init?: RequestInit) => Promise<Response>;

    constructor() {
        this.jar = new CookieJar();
        this.agent = new Agent({ rejectUnauthorized: false });
        // Cast the enhanced fetch to the correct function type
        this.fetch = makeFetchCookie(fetch, this.jar) as (url: RequestInfo, init?: RequestInit) => Promise<Response>;
        // No need to change the implementation, just ensure the type is correct
        this.request = (url, init) => this.fetch(url, { ...init, agent: this.agent });
    }

    private async login(username: string, password: string) {
        const url = queryString.stringifyUrl({
            url: `${this.HOST}/index.php`,
            query: { q: 'user/login' }
        });

        await this.request(url, {
            method: 'POST',
            body: `name=${username}&pass=${password}&form_build_id=${this.BUILD_ID}&form_id=user_login&op=Log+in`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).catch(() => {
            throw new Error('Error occured');
        });

        const cookies = await this.jar.getCookies(this.HOST);

        const authed = cookies.some((cookie) => cookie.key === 'AUTHSSL');

        if (authed) {
            return true;
        };

        throw new Error('Invalid credentials');
    };

    private async getScheduleType() {
        const url = `${this.HOST}/my-registrar/personal-schedule`;

        const text = await this.request(url).then((res) => res.text()).catch(() => {
            throw new Error('Error occured');
        });

        const type = scheduleTypeResolver(text);

        return type;
    };

    private async getCourses(type: 'reg' | 'current') {
        const url = queryString.stringifyUrl({
            url: `${this.HOST}/my-registrar/personal-schedule/json`,
            query: {
                method: 'getTimetable',
                type,
                page: 1,
                start: 0,
                limit: 50,
            }
        });

        const text = await this.request(url).then((res) => res.text()).catch(() => {
            throw new Error('Error occured');
        });

        const courses = parseScheduleToCourse(text);

        return courses;
    }


    public async sync(username: string, password: string): Promise<SyncResult> {
        
        await this.login(username, password);
        
        const type = await this.getScheduleType();
        const coursesData = await this.getCourses(type);
        
        return {courses: coursesData};
    }
}