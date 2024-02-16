import React, { FC, useState, useContext, ChangeEvent, FocusEvent, useEffect } from 'react';
import { useCourses } from '@/contexts';
import { AssignmentType } from '@/entities/assignment';
import { Input } from '@/shared/ui-library';
import { update } from '@/app/actions/Assignment/update';

interface Props {
    assignment: AssignmentType;
    onRemove: (assignmentId: string) => void;
}

const Assignment: FC<Props> = ({ assignment, onRemove }) => {

    const { updateAssignment } = useCourses();

    const [fieldValues, setFieldValues] = useState<AssignmentType>({
        name: assignment.name,
        points: assignment.points,
        totalPoints: assignment.totalPoints,
        weight: assignment.weight,
    });

    useEffect(() => {
        setFieldValues({...assignment})
    }, [assignment])

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFieldValues(prev => ({ ...prev, [name]: value }));

        if (value !== (assignment[name as keyof AssignmentType] as string)) {
            const updates = { [name]: value };

            try {
                if (assignment.courseId && assignment.id)
                updateAssignment(assignment.courseId, assignment.id, updates);
            } catch (error) {
                console.error("Failed to update assignment:", error);
            }
        }
    };

    
    return (
        <div className='flex w-full gap-2 phone:w-max'>
            <Input.Secondary className='phone:w-[90px]' name="name" value={fieldValues.name} onChange={handleFieldChange} />
            <Input.Secondary className='phone:w-[90px] text-right' name="points" value={fieldValues.points} onChange={handleFieldChange} />
            <Input.Secondary className='phone:w-[90px] text-right' name="totalPoints" value={fieldValues.totalPoints} onChange={handleFieldChange} />
            <Input.Secondary className='phone:w-[90px] text-right' name="weight" value={fieldValues.weight} onChange={handleFieldChange} />
            <button className='w-max bg-ghost px-4 !text-[36px] cursor-pointer rounded-m' onClick={() => assignment.id && onRemove(assignment.id)}>-</button>
        </div>
    );
};

export default Assignment;
