import { Injectable } from '@angular/core';
import { FormInput } from '../../models/form-input.model';
import { InvestmentResult } from '../../models/investment-result.model';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  investmentResults: Observable<InvestmentResult[]> = of([]);

  constructor() {}

  getInvestmentResults(): Observable<InvestmentResult[]> {
    return this.investmentResults;
  }

  calculateInvestmentResults(formInput: FormInput) {
    let investmentResults: InvestmentResult[] = [];
    let investmentValue = formInput.initialInvestment;

    for (let i = 0; i < formInput.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear =
        investmentValue * (formInput.expectedReturn / 100);
      investmentValue += interestEarnedInYear + formInput.annualInvestment;
      const totalInterest =
        investmentValue -
        formInput.annualInvestment * year -
        formInput.initialInvestment;
      investmentResults.push({
        year: year,
        valueEndOfYear: investmentValue,
        interestForYear: interestEarnedInYear,
        totalInterest: totalInterest,
        annualInvestment: formInput.annualInvestment,
        totalAmountInvested:
          formInput.initialInvestment + formInput.annualInvestment * year,
      });
    }

    this.investmentResults.pipe(switchMap(() => investmentResults));
  }
}
