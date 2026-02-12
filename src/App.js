import { useReducer } from "react";
import "./index.css";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  hasActiveLoan: false,
};

const fixed_deposit = 150;
const fixed_withdraw = 50;
const fixed_loan = 5000;

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return {
        ...state,
        balance: 500,
        isActive: true,
      };
    case "deposit":
      return {
        ...state,
        balance: state.balance + fixed_deposit,
      };
    case "withdraw":
      if (state.balance < fixed_withdraw)
        return {
          ...state,
          balance: 0,
        };
      return {
        ...state,
        balance: state.balance - fixed_withdraw,
      };
    case "req_loan":
      if (state.hasActiveLoan) return state;
      return {
        ...state,
        balance: state.balance + fixed_loan,
        hasActiveLoan: true,
        loan: state.loan + fixed_loan,
      };
    case "pay_loan":
      if (!state.hasActiveLoan) return state;
      if (state.balance < state.loan) return state;
      return {
        ...state,
        balance: state.balance - fixed_loan,
        hasActiveLoan: false,
        loan: 0,
      };
    case "close":
      if (state.balance >= 0 || state.hasActiveLoan) return state;
      return {
        ...initialState,
      };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <div className="App">
      <div className="App">
        <h1>useReducer Bank Account</h1>
        <p>Balance: {balance}</p>
        <p>Loan: {loan}</p>

        <p>
          <button
            onClick={() => dispatch({ type: "open" })}
            disabled={isActive}
          >
            Open account
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "deposit" })}
            disabled={!isActive}
          >
            Deposit 150
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "withdraw" })}
            disabled={!isActive}
          >
            Withdraw 50
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "req_loan" })}
            disabled={!isActive}
          >
            Request a loan of 5000
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "pay_loan" })}
            disabled={!isActive}
          >
            Pay loan
          </button>
        </p>
        <p>
          <button
            onClick={() => dispatch({ type: "close" })}
            disabled={!isActive}
          >
            Close account
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
