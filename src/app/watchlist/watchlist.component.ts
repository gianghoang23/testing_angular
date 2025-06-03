import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { AuthService } from '../auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { WIDGET_LIB_URL } from '../shared/constants/app.constants';

@Component({
  selector: 'app-watchlist',
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
})
export class WatchlistComponent {
  token: string | null = null;
  iframeSrc: any;

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getAccessToken();
    this.iframeSrc = {
      path: this.sanitizer.bypassSecurityTrustResourceUrl(
        WIDGET_LIB_URL.WATCH_LIST + `&token=${this.token}`
      ),
      height: 500,
    };
  }
}
