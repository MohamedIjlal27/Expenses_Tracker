import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionSummary = ({ transactions }) => {
  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + parseFloat(t.amount), 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount',
        data: [income, expense],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <div className="mb-4">
        <Bar data={data} />
      </div>
      <div>
        <p>Total Income: ${income.toFixed(2)}</p>
        <ul>
          {transactions.filter(t => t.type === 'income').map((t, index) => (
            <li key={index}>{t.category}: ${parseFloat(t.amount).toFixed(2)}</li>
          ))}
        </ul>
        <p>Total Expense: ${expense.toFixed(2)}</p>
        <ul>
          {transactions.filter(t => t.type === 'expense').map((t, index) => (
            <li key={index}>{t.category}: ${parseFloat(t.amount).toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionSummary;
