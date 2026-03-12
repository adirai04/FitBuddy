import React from 'react';
import { FitnessPlanResponse } from '../../../shared/types';
import { Dumbbell, Flame, Beef, Download, Copy } from 'lucide-react';

export const PlanCard: React.FC<{ plan: FitnessPlanResponse }> = ({ plan }) => {
  const handleCopy = () => navigator.clipboard.writeText(JSON.stringify(plan, null, 2));
  
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FitBuddy-Plan.json';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Your AI Plan</h2>
        <div className="flex space-x-3">
          <button onClick={handleCopy} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-md transition"><Copy size={18} /></button>
          <button onClick={handleDownload} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-md transition"><Download size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center space-x-4">
          <div className="p-3 bg-orange-500/10 text-orange-400 rounded-lg"><Flame size={24} /></div>
          <div>
            <p className="text-slate-400 text-sm">Daily Target</p>
            <p className="text-xl font-bold">{plan.caloriesEstimate} kcal</p>
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg"><Beef size={24} /></div>
          <div>
            <p className="text-slate-400 text-sm">Protein Intake</p>
            <p className="text-xl font-bold">{plan.proteinIntake}g</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold flex items-center"><Dumbbell className="mr-2 text-indigo-400" /> Weekly Routine</h3>
        {plan.weeklyRoutine.map((day, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-800/50 p-4 border-b border-slate-800 flex justify-between">
              <h4 className="font-bold text-indigo-300">{day.day}: {day.focus}</h4>
              {day.cardio && <span className="text-sm text-slate-400">Cardio: {day.cardio}</span>}
            </div>
            <div className="p-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-400">
                    <th className="pb-3 w-1/3">Exercise</th>
                    <th className="pb-3">Sets</th>
                    <th className="pb-3">Reps</th>
                    <th className="pb-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {day.exercises.map((ex, j) => (
                    <tr key={j}>
                      <td className="py-3 font-medium">{ex.name}</td>
                      <td className="py-3 text-slate-300">{ex.sets}</td>
                      <td className="py-3 text-slate-300">{ex.reps}</td>
                      <td className="py-3 text-slate-400 italic">{ex.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};