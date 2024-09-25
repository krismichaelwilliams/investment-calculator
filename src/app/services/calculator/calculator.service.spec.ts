import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormInput } from '../../models/form-input.model';
import {
  getFakeFormInput,
  getFakeInvestmentResults,
} from '../../test-helpers/test-helpers';
import { CalculatorService } from './calculator.service';
import { interval, of, take } from 'rxjs';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
