import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  else {
    return async function (dispatch, getState) {
      dispatch({ type: "account/convertingCurrency" });
      const response = await (
        await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
        )
      ).json();
      const convertedAmount = response.rates["USD"];
      dispatch({ type: "account/deposit", payload: convertedAmount });
    };
  }
}
export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
