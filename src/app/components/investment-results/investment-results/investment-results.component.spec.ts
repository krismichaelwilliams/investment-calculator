import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { InvestmentResultsComponent } from './investment-results.component';
import { CalculatorService } from '../../../services/calculator/calculator.service';
import { interval, take } from 'rxjs';
import {
  getFakeFormInput,
  getFakeInvestmentResults,
} from '../../../test-helpers/test-helpers';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventEmitter } from '@angular/core';
import { InvestmentResult } from '../../../models/investment-result.model';
import { __addDisposableResource } from 'tslib';

describe('InvestmentResultsComponent', () => {
  let component: InvestmentResultsComponent;
  let fixture: ComponentFixture<InvestmentResultsComponent>;
  let calculatorServiceSpy: jasmine.SpyObj<CalculatorService>;

  beforeEach(async () => {
    calculatorServiceSpy = jasmine.createSpyObj('CalculatorService', [
      'getInvestmentResults',
      'calculateInvestmentResults',
    ]);
    await TestBed.configureTestingModule({
      imports: [InvestmentResultsComponent],
      providers: [
        {
          provide: CalculatorService,
          useValue: calculatorServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentResultsComponent);
    component = fixture.componentInstance;

    calculatorServiceSpy.calculate = new EventEmitter<InvestmentResult[]>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initializeCalculateEventSubscriber', () => {
    it('should set investmentResults to the result of getInvestmentResults', fakeAsync(() => {
      // Arrange
      let expectedResult = getFakeInvestmentResults();
      calculatorServiceSpy.getInvestmentResults.and.returnValue(expectedResult);

      // Act
      interval(1000)
        .pipe(take(1))
        .subscribe(() => {
          calculatorServiceSpy.calculate?.emit(expectedResult);
        });
      tick(2000);

      // Assert
      expect(calculatorServiceSpy.getInvestmentResults).toHaveBeenCalledTimes(
        1
      );
      expect(component.investmentResults).toBeTruthy();
      expect(component.investmentResults).toEqual(expectedResult);
    }));

    it('should set displayResults to true', () => {
      // Assert
      expect(component.displayResults).toBeTrue();
    });
  });
});
