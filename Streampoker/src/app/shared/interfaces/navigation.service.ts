
export interface NavigationService {
    navigateToLogin(returnUrl: string): void;
    navigateToNewRoom(): void;
    navigateToRoom(roomKey: string): void;
    returnFromLogin(): void;
    reloadCurrentLocation(): void;
    getCurrentUri(): string;
}
