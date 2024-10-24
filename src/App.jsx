import React, { useState } from 'react';
import TransactionForm from './screens/TransactionForm';
import TransactionList from './screens/TransactionList';
import TransactionSummary from './screens/TransactionSummary';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const updateTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map((t, index) =>
      index === editIndex ? updatedTransaction : t
    );
    setTransactions(updatedTransactions);
    setTransactionToEdit(null);
    setEditIndex(null);
  };

  const deleteTransaction = (index) => {
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const editTransaction = (index) => {
    setTransactionToEdit(transactions[index]);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Expense Tracker</h1>
      <div className="flex w-full gap-8">
        <div className="w-1/3">
          <TransactionForm
            onAddTransaction={addTransaction}
            transactionToEdit={transactionToEdit}
            onUpdateTransaction={updateTransaction}
          />
        </div>
        <div className="w-2/3">
          <TransactionSummary transactions={transactions} />
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
            onEditTransaction={editTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
