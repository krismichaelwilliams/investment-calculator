import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('investmentResults', () => {
    it('should return calculatorService.resultData', () => {
      // Arrange
      calculatorServiceSpy.investmentResults?.set(getFakeInvestmentResults());
      let expectedResult = calculatorServiceSpy.investmentResults;

      // Act
      let result = component.investmentResults;

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
