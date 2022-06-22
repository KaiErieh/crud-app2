import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import guestService from "./guestService"

// Get guest from localstorage
const guest = JSON.parse(localStorage.getItem("guest"))


const initialState = {
    guest: guest ? guest : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    guestList: [],
    isDeleted: false,
}

// Register guest
export const register = createAsyncThunk(
    'guest/register',
    async (guest, thunkAPI) => {
        try {
            return await guestService.register(guest)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
//codeLogin guest
export const codeLogin = createAsyncThunk(
    'guest/codeLogin',
    async (code, thunkAPI) => {
        console.log("guestSlice.js: " + code.code)
        console.log(typeof code)
        try {
            return await guestService.codeLogin(code)

        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }

    }

)
export const getGuests = createAsyncThunk(
    'guests/getAll',
    async (_, thunkAPI) => {
        try {

            return await guestService.getGuests()
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const logout = createAsyncThunk('guest/logout', async () => {
    await guestService.logout()
})

export const addGuest = createAsyncThunk("guest/add", async (payload, thunkAPI) => {
    try {
        await guestService.addGuest(payload)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGuest = createAsyncThunk("guest/delete", async (id, thunkAPI) => {
    try {
        await guestService.deleteGuest(id)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.isDeleted = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.guest = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.guest = null
            })
            .addCase(codeLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(codeLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.guest = action.payload
            })
            .addCase(codeLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.guest = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.guest = null
            })
            .addCase(getGuests.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGuests.fulfilled, (state, action) => {
                state.isLoading = false
                state.guestList = action.payload
            })
            .addCase(getGuests.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addGuest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addGuest.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

            })
            .addCase(addGuest.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
            .addCase(deleteGuest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGuest.fulfilled, (state) => {
                state.isLoading = false
                state.isDeleted = true


            })
            .addCase(deleteGuest.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })
    },
})

export const { reset } = guestSlice.actions
export default guestSlice.reducer