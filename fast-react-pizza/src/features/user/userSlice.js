import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  errors: "",
};

function getPosisiton() {
  return new Promise(function (resolve, rejecet) {
    navigator.geolocation.getCurrentPosition(resolve, rejecet);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    const positionObj = await getPosisiton();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.postcode}, ${addressObj?.countryName}`;
    return { position, address };
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.errors =
          "There was a problem getting your address. Make sure to allow use location!";
      }),
});
export default userSlice.reducer;
export const { updateUsername } = userSlice.actions;
