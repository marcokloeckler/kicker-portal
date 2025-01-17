import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { getDatabase, onValue, ref } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnDestroy, OnInit {
  versionNumber: string = environment.versionNumber;
  isLoggedIn$: Observable<boolean>;
  mobileQuery: MediaQueryList;
  kickerStatus = true;
  kickerBusyTime: Date;
  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.isLoggedIn$ = this.authService.isLoggedIn;

    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/github.svg')
    );
  }

  ngOnInit() {
    onValue(ref(getDatabase(), '/Kicker'), (snapshot) => {
      this.kickerStatus = snapshot.val().status || false;
      if (this.kickerStatus === false) {
        this.kickerBusyTime = new Date(snapshot.val().startTime * 1000);
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  public changeLanguage(language: string): void {
    this.translate.use(language);
  }

  public logout() {
    this.authService.logout();
  }

  public goToBuglist() {
    window.open(
      'https://eviaconsulting.sharepoint.com/teams/kickerportal885/Lists/Tickets/AllItems.aspx?env=WebViewList',
      '_blank'
    );
  }

  public goToGithub() {
    window.open('https://github.com/Evia-Academy/kicker-portal', '_blank');
  }
}
