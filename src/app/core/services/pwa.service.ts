import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private deferredPrompt: any;
  public showInstallPrompt = false;

  constructor(private swUpdate: SwUpdate, private appRef: ApplicationRef) {
    this.initUpdateCheck();
    this.initInstallPrompt();
  }

  /**
   * Initialize service worker update checking
   * Checks for updates every 6 hours when app is stable
   */
  private initUpdateCheck(): void {
    if (!this.swUpdate.isEnabled) {
      console.log('Service Worker is not enabled');
      return;
    }

    // Check for updates every 6 hours
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );

    const everySixHours$ = interval(6 * 60 * 60 * 1000);

    appIsStable$.subscribe(() => {
      everySixHours$.subscribe(() => {
        this.swUpdate.checkForUpdate().then(() => {
          console.log('Checked for updates');
        });
      });
    });

    // Listen for version updates
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe(() => {
        this.promptUserToUpdate();
      });
  }

  /**
   * Initialize install prompt for PWA
   */
  private initInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      // Update UI to show install button
      this.showInstallPrompt = true;
      console.log('PWA install prompt available');
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.showInstallPrompt = false;
      this.deferredPrompt = null;
    });
  }

  /**
   * Prompt user to update the app
   */
  private promptUserToUpdate(): void {
    const confirmUpdate = confirm(
      'A new version of the app is available. Would you like to update now?'
    );

    if (confirmUpdate) {
      this.swUpdate.activateUpdate().then(() => {
        document.location.reload();
      });
    }
  }

  /**
   * Show install prompt to user
   * Call this method when user clicks on install button
   */
  public async installPwa(): Promise<void> {
    if (!this.deferredPrompt) {
      console.log('Install prompt is not available');
      return;
    }

    // Show the install prompt
    this.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await this.deferredPrompt.userChoice;

    console.log(`User response to install prompt: ${outcome}`);

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferred prompt
    this.deferredPrompt = null;
    this.showInstallPrompt = false;
  }

  /**
   * Check if app is running as installed PWA
   */
  public isInstalled(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://')
    );
  }

  /**
   * Check for updates manually
   */
  public checkForUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then((updateAvailable) => {
        if (updateAvailable) {
          console.log('Update is available');
        } else {
          console.log('App is up to date');
        }
      });
    }
  }

  /**
   * Force update the app
   */
  public forceUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.activateUpdate().then(() => {
        document.location.reload();
      });
    }
  }
}
