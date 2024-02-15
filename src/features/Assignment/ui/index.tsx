import { updateName } from '@/app/actions/Assignment/updateName';
import { AssignmentType } from '@/entities/assignment';
import { Input } from '@/shared/ui-library';
import React, { FC, HTMLAttributes, useState } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    assignment: AssignmentType;
}

const Assignment: FC<Props> = ({ assignment }) => {

    const [name, setName] = useState<string>(assignment.name);

    const handleNameChange = async () => {
        if (assignment.id && name !== assignment.name) await updateName({assignmentId: assignment.id, name})
    }

    return (
        <div className='flex w-full gap-2'>
            <Input.Secondary value={name} onChange={(e) => setName(e.target.value)} onBlur={handleNameChange} />
        </div>
    );
};

export default Assignment;