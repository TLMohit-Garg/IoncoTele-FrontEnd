import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDoctor: null,
}
const selectedDoctorSlice = createSlice({
    name:"doctor",
    initialState,
    reducers:{
        selectDoctor: (state, action) => {
            state.selectedDoctor = action.payload;
        },
        clearSelectedDoctor: (state) => {
            state.selectedDoctor = null; // Optionally clear selection when needed
          },
    }
});

export const { selectDoctor, clearSelectedDoctor } = selectedDoctorSlice.actions;
export default selectedDoctorSlice.reducer;