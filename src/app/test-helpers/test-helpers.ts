import { Random } from 'random-test-values';
import { FormInput } from '../models/form-input.model';
import { InvestmentResult } from '../models/investment-result.model';

export function getFakeFormInput(): FormInput {
  return {
    initialInvestment: Random.Number({ min: 1, max: 10000 }),
    annualInvestment: Random.Number({ min: 1000, max: 5000 }),
    expectedReturn: Random.Number({ min: 4, max: 10 }),
    duration: Random.Number({ min: 5, max: 20 }),
  };
}

export function getFakeInvestmentResults(): InvestmentResult[] {
  return [
    {
      year: Random.Number({ min: 1, max: 20 }),
      valueEndOfYear: Random.Number(),
      interestForYear: Random.Number(),
      totalInterest: Random.Number(),
      annualInvestment: Random.Number(),
      totalAmountInvested: Random.Number(),
    },
    {
      year: Random.Number({ min: 1, max: 20 }),
      valueEndOfYear: Random.Number(),
      interestForYear: Random.Number(),
      totalInterest: Random.Number(),
      annualInvestment: Random.Number(),
      totalAmountInvested: Random.Number(),
    },
    {
      year: Random.Number({ min: 1, max: 20 }),
      valueEndOfYear: Random.Number(),
      interestForYear: Random.Number(),
      totalInterest: Random.Number(),
      annualInvestment: Random.Number(),
      totalAmountInvested: Random.Number(),
    },
    {
      year: Random.Number({ min: 1, max: 20 }),
      valueEndOfYear: Random.Number(),
      interestForYear: Random.Number(),
      totalInterest: Random.Number(),
      annualInvestment: Random.Number(),
      totalAmountInvested: Random.Number(),
    },
  ];
}
