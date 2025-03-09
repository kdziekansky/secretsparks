
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="glass-panel p-8 w-full max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-medium mb-6 text-center">
          Płatność
        </h1>
        
        <p className="text-center mb-8">
          Tutaj będzie formularz płatności...
        </p>
        
        <div className="flex justify-center">
          <Link 
            to="/survey" 
            className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Powrót do ankiety</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
