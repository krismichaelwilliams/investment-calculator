import { TestBed } from '@angular/core/testing';
import { FormInput } from '../../models/form-input.model';
import {
  getFakeFormInput,
  getFakeInvestmentResults,
} from '../../test-helpers/test-helpers';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getInvestmentResults', () => {
    it('should return investmentResults', () => {
      // Arrange
      service.investmentResults = getFakeInvestmentResults();

      // Act
      let result = service.getInvestmentResults();

      // Assert
      expect(result).toEqual(service.investmentResults);
    });
  });

  describe('calculateInvestmentResults', () => {
    it('should set investmentResults to an InvestmentResult[] with a length equal the duration of the formInput', () => {
      // Arrange
      let formInput: FormInput = getFakeFormInput();

      // Act
      service.calculateInvestmentResults(formInput);
      let result = service.investmentResults;

      // Assert
      expect(result.length).toEqual(formInput.duration);
    });
  });
});
