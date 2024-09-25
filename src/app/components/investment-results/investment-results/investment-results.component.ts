import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { InvestmentResult } from '../../../models/investment-result.model';
import { CalculatorService } from '../../../services/calculator/calculator.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent implements OnInit {
  displayResults: boolean = false;
  investmentResults!: InvestmentResult[];
  destroyRef = inject(DestroyRef);

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.initializeCalculateEventSubscriber();
  }

  initializeCalculateEventSubscriber() {
    this.calculatorService.calculate
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.investmentResults = this.calculatorService.getInvestmentResults();
        // this.displayResults = true;
      });
  }
}
