import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");
  const account = useSelector((store) => store.account);
  const isLoading = account.isLoading;
  const dispatch = useDispatch();
  function handleDeposit() {
    dispatch(deposit(parseInt(depositAmount), currency));
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    dispatch(withdraw(parseInt(withdrawalAmount)));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    dispatch(requestLoan(parseInt(loanAmount), loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            min={1}
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          ></input>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>
          <button onClick={handleDeposit}>
            {isLoading ? "Converting ..." : `Deposit ${depositAmount}`}
          </button>
        </div>
        <div>
          <label>Withdraw</label>
          <input
            type="number"
            min={1}
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
          />
          {withdrawalAmount && (
            <button
              onClick={handleWithdrawal}
              disabled={withdrawalAmount > account.balance}
            >
              Withdraw {withdrawalAmount}
            </button>
          )}
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            min={0}
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          {loanAmount !== 0 && loanPurpose && (
            <button onClick={handleRequestLoan} disabled={account.loan > 0}>
              Request loan
            </button>
          )}
        </div>
        {account.loan > 0 && (
          <div>
            <span>Pay back {account.loan} </span>
            <button
              onClick={handlePayLoan}
              disabled={account.balance < account.loan}
            >
              Pay loan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
