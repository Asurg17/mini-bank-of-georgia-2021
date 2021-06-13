export class UserModel {
    constructor(
        public name: string,
        public username: string,
        public image: string,
        private _token: string,
        private _expirationDate: Date
    ){}

    get token() {
        if (this._expirationDate >= new Date()) {
            return this._token;
        }
    }
}
