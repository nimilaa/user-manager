import React, {useMemo, useState} from 'react';
import {Button, Form, Input} from "@heroui/react";
import {formatDateWithOffset} from "../utils/Helpers.util.ts";
import {User, UserFormErrors, UserFormFields} from "@/types";

interface ReactFormProps {
    user?: User;
    onSubmit: (user: User, isEdit: boolean) => void;
}

const UsersForm: React.FC<ReactFormProps> = ({user, onSubmit}) => {
    const [errors, setErrors] = useState<UserFormErrors>({});
    const fields: UserFormFields[] = useMemo(() => [
        {id: 'name', label: 'Name', placeHolder: 'Enter your name', errorMessage:'Name is required', isRequired: true, inputType:'text'},
        {id: 'age', label: 'Age', placeHolder: 'Enter your age', errorMessage:'Age is required', isRequired: true, inputType:'number'},
        {id: 'city', label: 'City', placeHolder: 'Enter your city', errorMessage:'City is required', isRequired: true, inputType:'text'},
        {id: 'address', label: 'Address', placeHolder: 'Enter your address', errorMessage:'Address is required', isRequired: true, inputType:'text'},
        {id: 'company', label: 'Company', placeHolder: 'Enter your company', errorMessage:'Company is required', isRequired: true, inputType:'text'},
        {id: 'email', label: 'Email', placeHolder: 'Enter your email', errorMessage:'Email is required', isRequired: true, inputType:'email'},
        {id: 'phone', label: 'Phone Number', placeHolder: 'Enter your phone number', errorMessage:'Phone number is required', isRequired: true, inputType:'text'}
    ], []);

    const validateAndSubmit = (e) => {
        e.preventDefault();

        const data:User = Object.fromEntries(new FormData(e.currentTarget)) as User;
        const errors: UserFormErrors = {};

        fields.forEach(field => {
            if (field.isRequired && !data[field.id]) {
                errors[field.id] = field.errorMessage;
            }
        });

        if(Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            const formattedNow = formatDateWithOffset(new Date());

            if(user) {
                data.id = user.id;
                data.createdAt = user.createdAt;
            } else {
                data.id = crypto.randomUUID();
                data.createdAt = formattedNow;
            }

            data.updatedAt = formattedNow;
            data.age = parseInt(data.age as string, 10);
            onSubmit(data, !!user);
        }
    };

    return (
        <Form
            validationErrors={errors}
            onSubmit={validateAndSubmit}
            className="gap-6 justify-between"
        >
            {fields.map((field) => (
                <Input
                    key={field.id}
                    isRequired
                    name={field.id}
                    label={field.label}
                    defaultValue={user?.[field.id]}
                    labelPlacement="outside"
                    placeholder={field.placeHolder}
                    type={field.inputType}
                />
            ))}
            <div className="flex gap-2">
                <Button type="submit" color="primary">{user? 'Update User': 'Add User'}</Button>
                <Button type="reset" variant="flat">Reset</Button>
            </div>
        </Form>
    );
}

export default UsersForm;