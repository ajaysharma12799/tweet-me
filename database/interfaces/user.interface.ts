interface IUSERINTERFACE {
    username: String,
    email: String,
    password: String,
};

interface ILOGINUSERINTERFACE {
    email: String,
    password: String,
}

export { IUSERINTERFACE, ILOGINUSERINTERFACE }