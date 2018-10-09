
export interface NavigationService {
    navigateToHome(): void;
    navigateToLogin(returnUrl: string): void;
    navigateToNewRoom(): void;
    navigateToRoom(roomKey: string): void;
    returnFromLogin(): void;
    reloadCurrentLocation(): void;
    getCurrentUri(): string;
}
