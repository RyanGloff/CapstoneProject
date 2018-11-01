function User (id, username, password, lastName, firstName, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.lastName = lastName;
    this.fistName = firstName;
    this.email = email;
}

exports.User =  User;