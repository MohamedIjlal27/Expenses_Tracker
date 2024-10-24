import React from 'react';

const TransactionList = ({ transactions, onDeleteTransaction, onEditTransaction }) => {
  return (
    <ul className="max-w-md mx-auto space-y-4">
      {transactions.map((transaction, index) => (
        <li
          key={index}
          className="flex justify-between items-center p-4 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 rounded-xl shadow-xl"
        >
          <span className="font-medium text-gray-800">
            {transaction.date} - {transaction.category} - {transaction.amount} {transaction.currency} ({transaction.type})
          </span>
          <div>
            <button
              onClick={() => onEditTransaction(index)}
              className="bg-yellow-500 text-white p-2 w-20 rounded-lg hover:bg-yellow-600 transition-colors mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteTransaction(index)}
              className="bg-red-500 text-white p-2 w-20 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
