import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WIDGET_LIB_URL } from '../shared/constants/app.constants';

interface WidgetIframe {
  path: SafeResourceUrl;
  height: number;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  token: string | null = null;
  iframeSrc: Record<string, WidgetIframe> = {};
  iframeWidgets: { key: string; path: SafeResourceUrl; height: number }[] = [];
  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.token = this.authService.getAccessToken();
    this.iframeSrc = {
      stockQuotes: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          WIDGET_LIB_URL.STOCK_QUOTES + `&token=${this.token}`
        ),
        height: 300,
      },
      technicalChart: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          WIDGET_LIB_URL.TECHNICAL_CHART + `&token=${this.token}`
        ),
        height: 750,
      },
      incomeStatement: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          WIDGET_LIB_URL.INCOME_STATEMENT + `&token=${this.token}`
        ),
        height: 850,
      },
      balanceSheet: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          WIDGET_LIB_URL.BALANCE_SHEET + `&token=${this.token}`
        ),
        height: 850,
      },
      cashFlow: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          WIDGET_LIB_URL.CASH_FLOW + `&token=${this.token}`
        ),
        height: 700,
      },
      analystTargetPrice: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          WIDGET_LIB_URL.ANALYST_TARGET_PRICE + `&token=${this.token}`
        ),
        height: 500,
      },
      brokerRating: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          WIDGET_LIB_URL.BROKER_RATING + `&token=${this.token}`
        ),
        height: 500,
      },
      watchList: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          WIDGET_LIB_URL.WATCH_LIST + `&token=${this.token}`
        ),
        height: 500,
      },
    };
    this.iframeWidgets = Object.entries(this.iframeSrc).map(([key, value]) => ({
      key,
      path: value.path,
      height: value.height,
    }));
  }
}
