import React, { FC, SVGProps } from 'react';

const Check: FC<SVGProps<SVGSVGElement>> = ({...props}) => {
    return (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M4.4831 2.25929C3.33867 2.3872 2.42262 3.29045 2.29021 4.42255C1.93451 7.4637 1.93451 10.5359 2.29021 13.5771C2.42262 14.7092 3.33867 15.6124 4.4831 15.7404C7.45993 16.0731 10.5396 16.0731 13.5164 15.7404C14.6608 15.6124 15.5769 14.7092 15.7093 13.5771C15.9648 11.3919 16.0368 9.19074 15.9251 6.99656C15.9222 6.93989 15.9434 6.88462 15.9835 6.84451L17.0223 5.80573C17.1425 5.68549 17.3479 5.76068 17.3607 5.93024C17.5567 8.53515 17.5029 11.1542 17.1991 13.7513C16.9843 15.5883 15.5094 17.0269 13.683 17.2311C10.5954 17.5761 7.40404 17.5761 4.31649 17.2311C2.49011 17.0269 1.01521 15.5883 0.80036 13.7513C0.43113 10.5944 0.43113 7.40523 0.80036 4.2483C1.01521 2.41134 2.49011 0.9727 4.31649 0.768575C7.40404 0.423496 10.5954 0.423496 13.683 0.768575C14.3262 0.840468 14.9259 1.0655 15.4423 1.40713C15.5439 1.47436 15.5539 1.6172 15.4678 1.70334L14.6649 2.50623C14.5992 2.5719 14.4974 2.58295 14.4155 2.53908C14.1421 2.39259 13.8383 2.29527 13.5164 2.25929C10.5396 1.92659 7.45992 1.92659 4.4831 2.25929Z" fill="#9065AF"/>
            <path d="M18.0301 3.03015C18.3229 2.73726 18.3229 2.26239 18.0301 1.96949C17.7372 1.6766 17.2623 1.6766 16.9694 1.96949L8.49973 10.4392L6.03006 7.96949C5.73716 7.6766 5.26229 7.6766 4.9694 7.96949C4.6765 8.26239 4.6765 8.73726 4.9694 9.03016L7.9694 12.0302C8.26229 12.323 8.73716 12.323 9.03006 12.0302L18.0301 3.03015Z" fill="#9065AF"/>
        </svg>
    );
};

export default Check;