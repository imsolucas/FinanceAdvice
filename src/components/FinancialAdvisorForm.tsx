"use client";
import { useState, FormEvent } from "react";
import { getFinancialAdvice } from "../lib/apiClient";

export default function FinancialAdvisorForm() {
  const [income, setIncome] = useState("");
  const [goal, setGoal] = useState("");
  const [expenses, setExpenses] = useState({
    rent: "",
    loan: "",
    entertainment: "",
    food: "",
    education: "",
    emergency: "",
    transport: "",
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExpenseChange = (e: { target: { name: any; value: any; }; }) => {
    setExpenses({ ...expenses, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    const messageContent = `
My goal is RM${goal}. I earn RM${income} monthly. Here are my expenses:
Rent: RM${expenses.rent}
Loan: RM${expenses.loan}
Entertainment: RM${expenses.entertainment}
Food: RM${expenses.food}
Education: RM${expenses.education}
Emergency: RM${expenses.emergency}
Oil and gas: RM${expenses.transport}
    `.trim();
    const messages = [
      {
        role: "system",
        content: `You are an Intelligent Financial Advisor integrated into a personal finance platform. Your core responsibility is to help users analyze their income and expenses, plan for savings goals, and make financially sound decisions based on their unique financial situation.

Skills:
- Income-Expense Analysis and Forecasting:
  Automated budget processing: When a user provides their monthly income, expenses, and savings goal, calculate monthly surplus or deficit.
  Goal tracking and projection: Calculate months to reach savings goal.
  Expense categorization: Classify expenses into essential, discretionary, debt-related, or investment-related.

- Smart Financial Planning & Recommendations:
  Plan optimization: Suggest budget restructuring to maximize savings and accelerate goals.
  Scenario simulation: Predict savings time with spending adjustments.
  Personalized guide output: Top 3 recommendations per month.

Restrictions:
- Do not store user data beyond session.
- No investment advice.
- Do not use markdown headings with ### or similar formatting in the output.
- Format the output clearly with bold sections and clean spacing.
- Avoid using any special text formatting codes like /text/.`,
      },
      {
        role: "user",
        content: messageContent,
      },
    ];
    try {
      const result = await getFinancialAdvice(messages);
      if (result.error) {
        setResponse(`Error: ${result.error}`);
      } else {
        setResponse(result.output?.text || "No response from assistant.");
      }
    } catch (err) {
      setResponse(`Error: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to format the response with proper styling
  const formatResponse = (text: string) => {
    // Replace bold markers with span elements
    const boldedText = text.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>');
    
    // Convert line breaks to <br> tags
    const formattedText = boldedText.replace(/\n/g, '<br>');
    
    return formattedText;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
        Financial Planning Assistant
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income and Goal */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Income (RM)
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                placeholder="e.g. 5000"
                style={{ color: "black" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Savings Goal (RM)
              </label>
              <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="e.g. 20000"
                style={{ color: "black" }}
              />
            </div>
          </div>

          {/* Expenses */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-800">
              Monthly Expenses (RM)
            </h3>
            <div className="space-y-2">
              {Object.keys(expenses).map((key) => (
                <div key={key} className="flex items-center">
                  <label className="w-28 text-sm font-medium text-gray-700 capitalize">
                    {key}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={expenses[key]}
                    onChange={handleExpenseChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                    placeholder="0"
                    style={{ color: "black" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing...
            </div>
          ) : (
            "Get Financial Advice"
          )}
        </button>
      </div>

      {response && (
        <div className="fixed top-4 right-4 w-96 max-h-[80vh] overflow-y-auto bg-white border border-blue-300 rounded-lg shadow-xl z-50">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 font-semibold rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg">Your Financial Advice</h3>
            <button 
              onClick={() => setResponse("")}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="p-4 text-gray-800" dangerouslySetInnerHTML={{ __html: formatResponse(response) }}></div>
        </div>
      )}
    </div>
  );
}