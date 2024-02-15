import React, { FC, useState, useContext, ChangeEvent, FocusEvent, useEffect } from 'react';
import { CourseContext } from '@/contexts';
import { AssignmentType } from '@/entities/assignment';
import { Input } from '@/shared/ui-library';
import { update } from '@/app/actions/Assignment/update';

interface Props {
    assignment: AssignmentType;
    onRemove: (assignmentId: string) => void;
}

const Assignment: FC<Props> = ({ assignment, onRemove }) => {
    // Initial state setup with string representations
    const [fieldValues, setFieldValues] = useState<AssignmentType>({
        name: assignment.name,
        points: assignment.points, // Assuming these are already strings
        totalPoints: assignment.totalPoints,
        weight: assignment.weight,
    });

    useEffect(() => {
        setFieldValues({...assignment})
    }, [assignment])

    const context = useContext(CourseContext);

    // Handle field changes
    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFieldValues(prev => ({ ...prev, [name]: value }));
    };

    // Handle blur event for updates
    const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (value !== (assignment[name as keyof AssignmentType] as string)) {
            const updates = { [name]: value };

            try {
                
                const updatedAssignment = await update({ assignmentId: assignment.id || '', updates });

                if (context && updatedAssignment.courseId) {
                    context.updateAssignmentOptimistically(updatedAssignment.courseId, updatedAssignment.id, updates);
                }
            } catch (error) {
                console.error("Failed to update assignment:", error);
            }
        }
    };

    
    return (
        <div className='flex w-full gap-2'>
            <Input.Secondary name="name" value={fieldValues.name} onChange={handleFieldChange} onBlur={handleBlur} />
            <Input.Secondary className='text-right' name="points" value={fieldValues.points} onChange={handleFieldChange} onBlur={handleBlur} />
            <Input.Secondary className='text-right' name="totalPoints" value={fieldValues.totalPoints} onChange={handleFieldChange} onBlur={handleBlur} />
            <Input.Secondary className='text-right' name="weight" value={fieldValues.weight} onChange={handleFieldChange} onBlur={handleBlur} />
            <button className='w-max bg-ghost px-4 !text-[36px] cursor-pointer rounded-m' onClick={() => assignment.id && onRemove(assignment.id)}>-</button>
        </div>
    );
};

export default Assignment;
