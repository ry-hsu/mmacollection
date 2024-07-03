import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface DepartmentInitialState {
    departmentId: string,
}

const initialDepartmentState: DepartmentInitialState = {
    departmentId: '',
    //displayName: '',
}


export const departmentSlice = createSlice({
    name: 'department',
    initialState: initialDepartmentState,
    reducers: {
        updateDepartment: (state, action: PayloadAction<string>) => {
            state.departmentId = action.payload;
            //state.displayName = action.payload.displayName
        },
    }
})

export const { updateDepartment } = departmentSlice.actions
export default departmentSlice.reducer