import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorService } from '../../../services/calculator/calculator.service';
import { getFakeInvestmentResults } from '../../../test-helpers/test-helpers';
import { UserInputComponent } from './user-input.component';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;
  let calculatorServiceSpy: jasmine.SpyObj<CalculatorService>;

  beforeEach(async () => {
    calculatorServiceSpy = jasmine.createSpyObj('CalculatorService', [
      'getInvestmentResults',
      'calculateInvestmentResults',
    ]);
    await TestBed.configureTestingModule({
      imports: [UserInputComponent],
      providers: [
        { provide: CalculatorService, useValue: calculatorServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should set calculatorService.InvestmentResult', () => {
      // Arrange
      let expectedResult = getFakeInvestmentResults();
      calculatorServiceSpy.calculateInvestmentResults.and.callFake(() => {
        calculatorServiceSpy.investmentResults = expectedResult;
      });

      // Act
      let result = component.onSubmit();

      // Assert
      expect(
        calculatorServiceSpy.calculateInvestmentResults
      ).toHaveBeenCalledTimes(1);
      expect(calculatorServiceSpy.investmentResults).toEqual(expectedResult);
    });
  });
});
