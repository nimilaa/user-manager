import React, {useMemo} from 'react';
import {Button, Form, Input} from "@heroui/react";
import {formatDateWithOffset} from "../utils/Helpers.util.ts";
import {User, UserFormFields} from "@/types";

interface ReactFormProps {
    user?: User;
    onSubmit: (user: User, isEdit: boolean) => void;
}

const UsersForm: React.FC<ReactFormProps> = ({user, onSubmit}) => {
    const fields: UserFormFields[] = useMemo(() => [
        {
            id: 'name',
            label: 'Name',
            placeHolder: 'Enter your name',
            valueMissingErrorMessage: 'Name is required',
            isRequired: true,
            inputType: 'text'
        },
        {
            id: 'age',
            label: 'Age',
            placeHolder: 'Enter your age',
            valueMissingErrorMessage: 'Age is required',
            isRequired: true,
            inputType: 'number'
        },
        {
            id: 'city',
            label: 'City',
            placeHolder: 'Enter your city',
            valueMissingErrorMessage: 'City is required',
            isRequired: true,
            inputType: 'text'
        },
        {
            id: 'address',
            label: 'Address',
            placeHolder: 'Enter your address',
            valueMissingErrorMessage: 'Address is required',
            isRequired: true,
            inputType: 'text'
        },
        {
            id: 'company',
            label: 'Company',
            placeHolder: 'Enter your company',
            valueMissingErrorMessage: 'Company is required',
            isRequired: true,
            inputType: 'text'
        },
        {
            id: 'email',
            label: 'Email',
            placeHolder: 'Enter your email',
            valueMissingErrorMessage: 'Email is required',
            typeMissingErrorMessage: 'Please enter a valid email address',
            isRequired: true,
            inputType: 'email'
        },
        {
            id: 'phone',
            label: 'Phone Number',
            placeHolder: 'Enter your phone number',
            valueMissingErrorMessage: 'Phone number is required',
            isRequired: true,
            inputType: 'text'
        }
    ], []);

    const onUserFormSubmit = (e) => {
        e.preventDefault();

        const data: User = Object.fromEntries(new FormData(e.currentTarget)) as User;
        const formattedNow = formatDateWithOffset(new Date());

        if (user) {
            data.id = user.id;
            data.createdAt = user.createdAt;
        } else {
            data.id = crypto.randomUUID();
            data.createdAt = formattedNow;
        }

        data.updatedAt = formattedNow;
        data.age = parseInt(data.age as string, 10);
        onSubmit(data, !!user);
    };

    return (
        <Form
            onSubmit={onUserFormSubmit}
            className="gap-6 justify-between"
        >
            {fields.map((field) => (
                <Input
                    key={field.id}
                    isRequired
                    errorMessage={({validationDetails, validationErrors}) => {
                        if (validationDetails.valueMissing) {
                            return field.valueMissingErrorMessage;
                        }

                        if (field.typeMissingErrorMessage && validationDetails.typeMismatch) {
                            return field.typeMissingErrorMessage;
                        }

                        return validationErrors;
                    }}
                    name={field.id}
                    label={field.label}
                    defaultValue={user?.[field.id]}
                    labelPlacement="outside"
                    placeholder={field.placeHolder}
                    type={field.inputType}
                />
            ))}
            <div className="flex gap-2">
                <Button type="submit"
                        className="bg-primary text-white dark:bg-default">{user ? 'Update User' : 'Add User'}</Button>
                <Button type="reset" className="bg-primary text-white dark:bg-default">Reset</Button>
            </div>
        </Form>
    );
}

export default UsersForm;