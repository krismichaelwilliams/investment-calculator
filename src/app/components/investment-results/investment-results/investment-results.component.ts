import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InvestmentResult } from '../../../models/investment-result.model';
import { CalculatorService } from '../../../services/calculator/calculator.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent implements OnInit {
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
      });
  }

  shouldDisplayResults(): boolean {
    return this.investmentResults?.length > 0;
  }
}
