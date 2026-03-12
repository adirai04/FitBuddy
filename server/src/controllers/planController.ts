import { Request, Response, NextFunction } from 'express';
import { generatePlanFromAI } from '../services/geminiService';
import { FitnessProfileSchema } from '../../../shared/types';

export const createPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Validate Input
    const parsedData = FitnessProfileSchema.safeParse(req.body);
    
    if (!parsedData.success) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation Error', 
        // Use .issues instead of .errors to bypass the TS getter inference issue
        details: parsedData.error.issues 
        
        // PRO TIP: For an even cleaner frontend experience, use flatten() to map errors to field names:
        // details: parsedData.error.flatten().fieldErrors 
      });
    }

    // 2. Call AI Service
    const plan = await generatePlanFromAI(parsedData.data);

    // 3. Return Standardized Response
    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    next(error);
  }
};