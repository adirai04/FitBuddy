import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FitnessProfileSchema, FitnessProfile } from '../../../shared/types';
import { Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (data: FitnessProfile) => void;
  isLoading: boolean;
}

export const FitnessForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FitnessProfile>({
    resolver: zodResolver(FitnessProfileSchema),
    defaultValues: {
      goal: 'Maintain Fitness',
      level: 'Beginner',
      diet: 'Veg',
      daysPerWeek: 3,
      equipment: 'Dumbbells, Mat'
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-xl max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Age</label>
          <input type="number" {...register('age', { valueAsNumber: true })} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
          {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age.message}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Gender</label>
          <select {...register('gender')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Height & Weight */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Height (cm)</label>
          <input type="number" {...register('height', { valueAsNumber: true })} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Weight (kg)</label>
          <input type="number" {...register('weight', { valueAsNumber: true })} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
        </div>

        {/* Goal & Level */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Goal</label>
          <select {...register('goal')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition">
            <option value="Lose Weight">Lose Weight</option>
            <option value="Gain Muscle">Gain Muscle</option>
            <option value="Maintain Fitness">Maintain Fitness</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Fitness Level</label>
          <select {...register('level')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Days & Diet */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Days Per Week</label>
          <input type="number" {...register('daysPerWeek', { valueAsNumber: true })} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Dietary Preference</label>
          <select {...register('diet')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition">
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Vegan">Vegan</option>
          </select>
        </div>

        {/* Equipment */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-1">Available Equipment</label>
          <input type="text" {...register('equipment')} placeholder="e.g., Dumbbells, Resistance Bands, None" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition" />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center disabled:opacity-50"
      >
        {isLoading ? <><Loader2 className="animate-spin mr-2" /> Generating AI Plan...</> : 'Generate Fitness Plan'}
      </button>
    </form>
  );
};