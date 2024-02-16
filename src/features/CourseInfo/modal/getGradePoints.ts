const getGradePoints = (percent: number): number => {
    const grades = [
        { threshold: 95, grade: 4 },
        { threshold: 90, grade: 3.67 },
        { threshold: 85, grade: 3.33 },
        { threshold: 80, grade: 3 },
        { threshold: 75, grade: 2.67 },
        { threshold: 70, grade: 2.33 },
        { threshold: 65, grade: 2 },
        { threshold: 60, grade: 1.67 },
        { threshold: 55, grade: 1.33 },
        { threshold: 50, grade: 1 },
    ];

    const grade = grades.find(g => percent > g.threshold);

    return grade ? grade.grade : 0;
};


export default getGradePoints;