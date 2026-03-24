import { PayCalculator } from './components/PayCalculator';
import { Truck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <header className="bg-blue-600 text-white py-2 px-4 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <Truck size={20} />
          <h1 className="font-semibold text-base">Truck Driver Pay Calculator</h1>
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto p-4 pb-8">
        <PayCalculator />
      </main>
    </div>
  );
}
