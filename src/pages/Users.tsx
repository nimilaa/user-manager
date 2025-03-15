import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Button, Input} from "@heroui/react";
import {IRowNode, ColDef} from "ag-grid-community";
import {useDispatch, useSelector} from "react-redux";
import {User} from "@/types";
import {AppDispatch, RootState} from "@/app/store.ts";
import {AddUserIcon, BarChartIcon, DeleteIcon, EditIcon, PieChartIcon} from "@/components/Icons.tsx";
import {addUser, deleteUser, editUser, fetchUsers} from "@/features/users/usersSlice.ts";

const Users: React.FC = ({}) => {
    const [isUserModalOpen, setUserModalOpen] = useState<boolean>(false);
    const [isAgeChartModalOpen, setIsAgeChartModalOpen] = useState<boolean>(false);
    const [isCityChartModalOpen, setIsCityChartModalOpen] = useState<boolean>(false);
    const [selectedUserToEdit, setSelectedUserToEdit] = useState<User>(null);
    const [searchKey, setSearchKey] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const {data} = useSelector((state: RootState) => state.users);
    const colDefs = useMemo(() => [
        {field: "name", minWidth: 190},
        {field: "age", minWidth: 60},
        {field: "city", minWidth: 130},
        {field: "address", minWidth: 500},
        {field: "company", minWidth: 130},
        {field: "email", minWidth: 270},
        {field: "phone", minWidth: 170},
        {
            headerName: "Actions",
            cellRenderer: (params: any) => (
                <div className="flex justify-center gap-2">
                    <button
                        className="bg-primary text-white p-2 rounded flex items-center"
                        onClick={() => onEditUser(params.data)}
                    >
                        <EditIcon className="w-4 h-4"/>
                    </button>
                    <button
                        className="bg-red-500 text-white p-2 rounded flex items-center"
                        onClick={() => handleDeleteUser(params.data.id)}
                    >
                        <DeleteIcon className="w-4 h-4"/>
                    </button>
                </div>
            ),
            minWidth: 100,
            filter: false
        }
    ], []);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            filter: true,
        };
    }, []);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const onEditUser = useCallback((user: User) => {
        setSelectedUserToEdit(user);
        setUserModalOpen(true);
    }, []);

    const onCloseUserFormModal = useCallback(() => {
        setUserModalOpen(false);
        setSelectedUserToEdit(null);
    }, [])

    const handleAddAndEditUser = useCallback((user: User, isEdit: boolean) => {
        if (user) {
            if (isEdit) {
                dispatch(editUser(user));
            } else {
                dispatch(addUser(user));
            }
            setUserModalOpen(false);
        }
    }, []);

    const handleDeleteUser = useCallback((id: number) => {
        dispatch(deleteUser(id));
    }, []);

    const doesExternalFilterPass = useCallback(
        (node: IRowNode<User>): boolean => {
            if (node.data && searchKey !== '') {
                return node.data.name.toLowerCase().includes(searchKey)
                    || node.data.city.toLowerCase().includes(searchKey)
                    || node.data.company.toLowerCase().includes(searchKey)
                    || node.data.address.toLowerCase().includes(searchKey)
                    || node.data.email.toLowerCase().includes(searchKey)
            }
            return true;
        },
        [searchKey],
    );

    return (
        <div className="w-screen h-full">
            <div className="flex max-xs:px-4 max-md:px-6 md:px-6 py-2 max-xs:gap-4 max-md:gap-6 md:gap-6">
                <Input
                    isClearable
                    labelPlacement="outside"
                    placeholder="Search by name, city, company, address, email"
                    value={searchKey}
                    onValueChange={(newValue: string) => setSearchKey(newValue?.toLowerCase())}
                />
                <Button color="primary" onPress={() => setUserModalOpen(true)} className="max-xs:min-w-10 max-xs:px-2 md:min-w-36"><AddUserIcon/><span className="ml-2 md:block hidden">Add User</span></Button>
                <Button color="primary" onPress={() => setIsAgeChartModalOpen(true)} className="max-xs:min-w-10 max-xs:px-2 md:min-w-44"><PieChartIcon/><span className="ml-2 md:block hidden">Open Age Chart</span></Button>
                <Button color="primary" onPress={() => setIsCityChartModalOpen(true)} className="max-xs:min-w-10 max-xs:px-2 md:min-w-44"><BarChartIcon/><span className="ml-2 md:block hidden">Open City Chart</span></Button>
            </div>
            <div className="h-user-table-container">
                <Table data={data} colDefs={colDefs} defaultColDef={defaultColDef} externalSearchKey={searchKey} doesExternalFilterPass={doesExternalFilterPass}/>
            </div>
            <UserFormModal isOpen={isUserModalOpen} user={selectedUserToEdit} onClose={onCloseUserFormModal} onSubmit={handleAddAndEditUser}/>
            <DistributionByAgeChartModal  userData={data} isOpen={isAgeChartModalOpen} onClose={() => setIsAgeChartModalOpen(false)}/>
            <DistributionByCityChartModal  userData={data} isOpen={isCityChartModalOpen} onClose={() => setIsCityChartModalOpen(false)}/>
        </div>
    );
}

export default Users;