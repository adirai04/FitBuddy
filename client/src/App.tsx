import React from 'react';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { FitnessForm } from './components/FitnessForm';
import { PlanCard } from './components/PlanCard';
import { generatePlan } from './lib/api';
import { Activity } from 'lucide-react';

const queryClient = new QueryClient();

function FitBuddyApp() {
  const mutation = useMutation({
    mutationFn: generatePlan,
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center">
          <Activity className="text-indigo-500 mr-2" size={28} />
          <h1 className="text-xl font-bold tracking-tight">FitBuddy <span className="text-indigo-400">AI</span></h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">Your AI Personal Trainer</h2>
          <p className="text-slate-400 text-lg">Generate a highly customized, structured fitness and diet plan in seconds.</p>
        </div>

        {!mutation.isSuccess ? (
          <FitnessForm onSubmit={(data) => mutation.mutate(data)} isLoading={mutation.isPending} />
        ) : (
          <div className="space-y-6">
            <button 
              onClick={() => mutation.reset()}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold mb-4 flex items-center"
            >
              ← Generate New Plan
            </button>
            <PlanCard plan={mutation.data} />
          </div>
        )}

        {mutation.isError && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-center max-w-2xl mx-auto">
            An error occurred while generating your plan. Please try again.
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FitBuddyApp />
    </QueryClientProvider>
  );
}