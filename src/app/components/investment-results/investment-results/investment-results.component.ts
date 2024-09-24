import { Component } from '@angular/core';
import { InvestmentResult } from '../../../models/investment-result.model';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  displayResults: boolean = false;
  investmentResults!: InvestmentResult[];
}
