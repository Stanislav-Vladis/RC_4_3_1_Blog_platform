// eslint-disable-next-line import/namespace
import { createSlice } from '@reduxjs/toolkit';

import { Status } from '../../services/types';

const initialState = {
	status: Status.WAIT,
	errors: {},
};

export const serverStatusSlice = createSlice({
	name: 'server',
	initialState,
	reducers: {
		setLoading(state) {
			state.status = Status.LOADING;
			state.errors = {};
		},
		setError(state, { payload = {} }) {
			state.status = Status.ERROR;
			state.errors = payload;
		},
		setWait(state, { payload = {} }) {
			state.status = Status.WAIT;
			state.errors = payload;
		},
		setSuccess(state) {
			state.status = Status.SUCCESS;
			state.errors = {};
		},
	},
});
export const { setLoading, setError, setWait, setSuccess } = serverStatusSlice.actions;
export default serverStatusSlice.reducer;
