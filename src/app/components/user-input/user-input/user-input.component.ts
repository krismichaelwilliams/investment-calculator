import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormInput } from '../../../models/form-input.model';
import { CalculatorService } from '../../../services/calculator/calculator.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  formInput: FormInput = {
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 0,
    duration: 0,
  };

  constructor(private calculatorService: CalculatorService) {}

  onSubmit() {
    this.calculatorService.calculateInvestmentResults(this.formInput);
  }
}
