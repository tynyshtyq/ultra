const getGrade = (percent: number): string => {
    const grades = [
        { threshold: 95, grade: 'A' },
        { threshold: 90, grade: 'A-' },
        { threshold: 85, grade: 'B+' },
        { threshold: 80, grade: 'B' },
        { threshold: 75, grade: 'B-' },
        { threshold: 70, grade: 'C+' },
        { threshold: 65, grade: 'C' },
        { threshold: 60, grade: 'C-' },
        { threshold: 55, grade: 'D+' },
        { threshold: 50, grade: 'D' },
    ];

    const grade = grades.find(g => percent > g.threshold);

    return grade ? grade.grade : 'F';
};


export default getGrade;