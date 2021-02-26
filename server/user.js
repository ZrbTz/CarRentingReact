class User{    
    constructor(id, email, password) {
        if(id)
            this.id = id;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;