
'use client';
import { useState } from 'react';
import FinancialAdvisorForm from "@/components/FinancialAdvisorForm";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Personal Finance Assistant</h1>
        <p className="text-xl text-gray-700 mb-8">
          Get personalized financial advice to help you reach your savings goals faster
        </p>
        
        <button 
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all transform hover:scale-105"
        >
          Get Financial Advice
        </button>
      </div>
      
      {/* Features Section */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-2xl font-bold mb-2">💰</div>
          <h3 className="text-xl text-black font-semibold mb-2">Budget Analysis</h3>
          <p className="text-gray-600">Get a detailed breakdown of your spending habits and identify areas to save.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-2xl font-bold mb-2">🎯</div>
          <h3 className="text-xl text-black font-semibold mb-2">Goal Planning</h3>
          <p className="text-gray-600">Set financial goals and get a customized plan to achieve them faster.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-2xl font-bold mb-2">📊</div>
          <h3 className="text-xl text-black font-semibold mb-2">Smart Recommendations</h3>
          <p className="text-gray-600">Receive personalized tips based on your income and spending patterns.</p>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-2">
              <FinancialAdvisorForm onComplete={closeModal} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}