import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { EventEmitter } from '@angular/core';
import { interval, take } from 'rxjs';
import { InvestmentResult } from '../../../models/investment-result.model';
import { CalculatorService } from '../../../services/calculator/calculator.service';
import { getFakeInvestmentResults } from '../../../test-helpers/test-helpers';
import { InvestmentResultsComponent } from './investment-results.component';

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
  });

  describe('shouldDisplayResults', () => {
    it('should set displayResults to true if investmentResults is not null or empty', fakeAsync(() => {
      // Arrange
      calculatorServiceSpy.getInvestmentResults.and.returnValue(
        getFakeInvestmentResults()
      );

      // Act
      interval(1000)
        .pipe(take(1))
        .subscribe(() => {
          calculatorServiceSpy.calculate?.emit();
        });
      tick(2000);

      // Assert
      expect(component.shouldDisplayResults()).toBeTrue();
    }));

    it('should set displayResults to false if investmentResults is null or empty', fakeAsync(() => {
      // Arrange
      calculatorServiceSpy.getInvestmentResults.and.returnValue([]);

      // Act
      interval(1000)
        .pipe(take(1))
        .subscribe(() => {
          calculatorServiceSpy.calculate?.emit([]);
        });
      tick(2000);

      // Assert
      expect(component.shouldDisplayResults()).toBeFalse();
    }));
  });
});
