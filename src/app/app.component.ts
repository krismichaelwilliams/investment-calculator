import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header/header.component';
import { InvestmentResultsComponent } from './components/investment-results/investment-results/investment-results.component';
import { UserInputComponent } from './components/user-input/user-input/user-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {}
