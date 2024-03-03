// eslint-disable-next-line import/namespace
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	isAuth: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
			state.isAuth = true;
		},
		logOutUser(state) {
			state.user = {};
			state.isAuth = false;
		},
	},
});
export const { logOutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
