const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
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
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
