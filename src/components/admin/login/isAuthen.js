class Authentication {
    constructor() {}

    isAuthentication() {
        let accessToken = null;
        if (localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"));
            accessToken = user;
        }

        return accessToken !== null && accessToken.roles.includes("ROLE_ADMIN");
    }
}

const authentication = new Authentication();
export { authentication };
