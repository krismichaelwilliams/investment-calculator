import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CalculatorService } from '../../../services/calculator/calculator.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  constructor(private calculatorService: CalculatorService) {}

  investmentResults = this.calculatorService.investmentResults?.asReadonly();
}
