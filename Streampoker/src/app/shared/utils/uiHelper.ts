export class UiHelper {
    static RunAsync(action: () => void) {
        Promise.resolve(null).then(() => action());
    }
}
