import {createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {usersAPIEndPont} from "@/config/apiConfig.ts";
import {User, UsersState} from "@/types";
import {RootState} from "@/app/store.ts";

// Initial state
const initialState: UsersState = {
    data: [],
    isLoading: false,
    isError: false,
};

export const fetchUsers = createAsyncThunk<User[], void>('users/fetchUsers',
    async (): Promise<User[]> => {
        const response = await fetch(usersAPIEndPont);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    }
);
export const addUser = createAsyncThunk<User, User>('users/addUser',
    async (newUser: User): Promise<User> => {
        const response = await fetch(usersAPIEndPont, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser),
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        return response.json();
    }
);
export const editUser = createAsyncThunk<User, User>('users/editUser',
    async (updatedUser: User): Promise<User> => {
        const response = await fetch(`${usersAPIEndPont}/${updatedUser.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedUser),
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        return response.json();
    }
);
export const deleteUser = createAsyncThunk<string, string>('users/deleteUser',
    async (userId: string): Promise<string> => {
        const response = await fetch(`${usersAPIEndPont}/${userId}`, {method: 'DELETE'});
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        return userId; // Return deleted user ID
    }
);

const usersSlice = createSlice<UsersState, {}>({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder:ActionReducerMapBuilder<RootState>) => {
        builder
            .addCase(fetchUsers.pending, (state: RootState) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchUsers.fulfilled, (state: RootState, action: PayloadAction<User[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state: RootState) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(addUser.fulfilled, (state: RootState, action: PayloadAction<User>) => {
                state.data.push(action.payload);
            })
            .addCase(editUser.fulfilled, (state: RootState, action: PayloadAction<User>) => {
                const index = state.data.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state: RootState, action: PayloadAction<string>) => {
                state.data = state.data.filter((user) => user.id !== action.payload);
            });
    },
});
export default usersSlice.reducer;
