import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./Storage";
import axios, { AxiosError } from "axios";
import { LoginResponse } from "../Interfaces/auth.interface";
import { API_URL } from "../helpers/const";
import { Profile } from "../Interfaces/user.interface";
import { RootState } from "./index"

export const JWT_PERSISTENT_STATE = "userData"


export interface UserState {
    jwt: string | null
    loginErrorMessage?: string
    registerErrorMessage?: string
    profile?: Profile
}

export interface UserPersistentState {
    jwt: string | null
}


const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
}

export const fetchLogin = createAsyncThunk(
    "user/fetchLogin",
    async (params: { email: string, password: string }) => {
        try {
            const { data } = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email: params.email, password: params.password })
            return data
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data.message)
            }
        }

    }
)

export const registerProfile = createAsyncThunk(
    "user/registerProfile",
    async (params: { email: string, password: string, name: string }) => {
        try {
            const { data } = await axios.post<LoginResponse>(`${API_URL}/auth/register`, { email: params.email, password: params.password, name: params.name })
            return data
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data.message)
            }
        }

    }
)

export const fetchProfile = createAsyncThunk<Profile, void, { state: RootState }>(
    "user/fetchProfile",
    async (_, thunkAPI) => {
        const jwt = thunkAPI.getState().user.jwt
        const { data } = await axios.get<Profile>(`${API_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        return data
    }
)

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined
        },
        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action) => {
                if (!action.payload) {
                    return
                }
                state.jwt = action.payload.access_token
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.loginErrorMessage = action.error.message
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.profile = action.payload
            })
            //register
            .addCase(registerProfile.fulfilled, (state, action) => {
                if (!action.payload) {
                    return
                }
                state.jwt = action.payload.access_token
            })
            .addCase(registerProfile.rejected, (state, action) => {
                state.registerErrorMessage = action.error.message
            })
    }
})

export const { logout, clearLoginError, clearRegisterError } = UserSlice.actions
export default UserSlice.reducer