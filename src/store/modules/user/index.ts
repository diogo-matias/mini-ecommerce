import { createSlice } from "@reduxjs/toolkit";

type setUserInfoActionType = {
    payload: {
        email: string;
        password: string;
    };
    type: string;
};

type stateType = {
    email: string;
    password: string;
};

const initialState: stateType = {
    email: "",
    password: "",
};

const UserSlice = createSlice({
    name: "@user",
    initialState,
    reducers: {
        setUserInfo: (state, { payload }: setUserInfoActionType) => {
            const { email, password } = payload;

            state.email = email;
            state.password = password;
        },
    },
});

export default UserSlice.reducer;

export const UserActions = {
    ...UserSlice.actions,
};
