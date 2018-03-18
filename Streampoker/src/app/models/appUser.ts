export class AppUser {
    uid: string;
    loginName: string;

    constructor (uid: string, loginName: string) {
        this.uid = uid;
        this.loginName = loginName;
    }
}
