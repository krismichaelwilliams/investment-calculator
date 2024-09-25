import { EventEmitter, Injectable, Output } from '@angular/core';
import { FormInput } from '../../models/form-input.model';
import { InvestmentResult } from '../../models/investment-result.model';
import { Observable, of, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  investmentResults: InvestmentResult[] = [
    {
      year: 0,
      valueEndOfYear: 1,
      interestForYear: 2,
      totalInterest: 3,
      annualInvestment: 4,
      totalAmountInvested: 5,
    },
  ];
  @Output() calculate = new EventEmitter<InvestmentResult[]>();

  constructor() {}

  getInvestmentResults(): InvestmentResult[] {
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

    this.investmentResults = investmentResults;
    this.calculate.emit(this.investmentResults);
  }
}
