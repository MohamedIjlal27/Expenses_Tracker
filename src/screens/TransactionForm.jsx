import React, { useState, useEffect } from 'react';

const TransactionForm = ({ onAddTransaction, transactionToEdit, onUpdateTransaction }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState('expense');
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState(['Food', 'Rent', 'Savings']);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  useEffect(() => {
    if (transactionToEdit) {
      setAmount(transactionToEdit.amount);
      setCurrency(transactionToEdit.currency);
      setCategory(transactionToEdit.category);
      setDate(transactionToEdit.date);
      setType(transactionToEdit.type);
    }
  }, [transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !currency || !category || !date || !type) {
      alert('Please fill in all fields');
      return;
    }
    if (transactionToEdit) {
      onUpdateTransaction({ amount, currency, category, date, type });
    } else {
      onAddTransaction({ amount, currency, category, date, type });
    }
    // Reset fields to default values
    setAmount('');
    setCurrency('');
    setCategory('');
    setDate('');
    setType('');
  };

  const handleAddCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setCategory(customCategory);
      setCustomCategory('');
      setIsAddingCategory(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-6 rounded-2xl shadow-2xl space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          label='Amount'
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Currency</label>
        <select
          label='Currency'
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="LKR">LKR</option>
          <option value="Bitcoin">Bitcoin</option>
          <option value="Ethereum">Ethereum</option>
        </select>
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        {isAddingCategory ? (
          <div className="flex items-center">
            <input
              label='Category'
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Add custom category"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="ml-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        ) : (
          <select
            label='Category'
            value={category}
            onChange={(e) => {
              if (e.target.value === 'add') {
                setIsAddingCategory(true);
              } else {
                setCategory(e.target.value);
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
            <option value="add">Add new category</option>
          </select>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          label='Date'
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          label='Type'
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors"
      >
        {transactionToEdit ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;
