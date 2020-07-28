import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        bugAdded: (state, action) => {
            state.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            });
        },
        bugResolved: (state, action) => {
            const index = state.findIndex(bug => bug.id === action.payload.id);
            state[index].resolved = true;
        }
    }
});

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;

//selector
//Memoization
export const getUnresolvedBugs = createSelector(
    state => state.entities.bugs,
    state => state.entities.projects,
    (bugs, projects) => bugs.filter(bug => !bug.resolved)
);