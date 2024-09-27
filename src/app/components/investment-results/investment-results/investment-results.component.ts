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
  displayResults: boolean = true;

  constructor(private calculatorService: CalculatorService) {}

  get investmentResults() {
    return this.calculatorService.investmentResults;
  }
}
