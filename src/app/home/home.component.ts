import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
          `http://localhost:3000/widgetlibrary_dev/s360/stock-quote/03?quoteHeader=1&widgetBorder=1&widgetPaddingTop=16&widgetPaddingRight=24&widgetPaddingBottom=36&widgetPaddingLeft=24&locale=en-US&theme=light&language=en&ric=MSFT.O&token=${this.token}`
        ),
        height: 300,
      },
      technicalChart: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          `http://localhost:3000/widgetlibrary_dev/s360/advanced-chart/01?widgetBorder=1&quoteHeader=1&widgetPaddingTop=16&widgetPaddingRight=24&widgetPaddingBottom=36&widgetPaddingLeft=24&locale=en-US&theme=light&language=en&ric=MSFT.O&token=${this.token}`
        ),
        height: 750,
      },
      incomeStatement: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          `http://localhost:3000/widgetlibrary_dev/s360/income-statement/01?quoteHeader=1&widgetBorder=1&widgetPaddingTop=16&widgetPaddingRight=24&widgetPaddingBottom=36&widgetPaddingLeft=24&locale=en-US&theme=light&language=en&ric=MSFT.O&token=${this.token}`
        ),
        height: 850,
      },
      balanceSheet: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          `http://localhost:3000/widgetlibrary_dev/s360/balance-sheet/01?quoteHeader=1&widgetBorder=1&widgetPaddingTop=16&widgetPaddingRight=24&widgetPaddingBottom=36&widgetPaddingLeft=24&locale=en-US&theme=light&language=en&ric=MSFT.O&token=${this.token}`
        ),
        height: 850,
      },
      cashFlow: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          `http://localhost:3000/widgetlibrary_dev/s360/cash-flow/01?quoteHeader=1&widgetBorder=1&widgetPaddingTop=16&widgetPaddingRight=24&widgetPaddingBottom=36&widgetPaddingLeft=24&locale=en-US&theme=light&language=en&ric=MSFT.O&token=${this.token}`
        ),
        height: 700,
      },
      analystTargetPrice: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          'http://localhost:3000/widgetlibrary_dev/s360/target-price/01?quoteHeader=1&widgetBorder=1&widgetPaddingTop=16&widgetPaddingRight=24&widgetPaddingBottom=36&widgetPaddingLeft=24&locale=en-US&theme=light&language=en&ric=MSFT.O&token=' +
            this.token
        ),
        height: 500,
      },
      brokerRating: {
        path: this.sanitizer.bypassSecurityTrustResourceUrl(
          `http://localhost:3000/widgetlibrary_dev/s360/broker-rating/01?quoteHeader=1&widgetBorder=1&widgetPaddingTop=16&widgetPaddingRight=24&widgetPaddingBottom=36&widgetPaddingLeft=24&locale=en-US&theme=light&language=en&ric=MSFT.O&token=${this.token}`
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
