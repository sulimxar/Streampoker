
export interface NavigationService {

    navigateToLogin(returnUrl: string): void;

    returnFromLogin(): void;

    reloadCurrentLocation(): void;
}
