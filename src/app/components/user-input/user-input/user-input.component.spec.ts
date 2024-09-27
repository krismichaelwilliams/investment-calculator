import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorService } from '../../../services/calculator/calculator.service';
import { getFakeFormInput } from '../../../test-helpers/test-helpers';
import { UserInputComponent } from './user-input.component';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;
  let calculatorServiceSpy: jasmine.SpyObj<CalculatorService>;

  beforeEach(async () => {
    calculatorServiceSpy = jasmine.createSpyObj('CalculatorService', [
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
      component.formInput = getFakeFormInput();
      calculatorServiceSpy.calculateInvestmentResults.withArgs(
        component.formInput
      );

      // Act
      component.onSubmit();

      // Assert
      expect(
        calculatorServiceSpy.calculateInvestmentResults
      ).toHaveBeenCalledOnceWith(component.formInput);
    });
  });
});
