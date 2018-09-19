function auditAddUser (user) {
    return user.id !== undefined &&
        user.username !== undefined &&
        user.password !== undefined &&
        user.firstName !== undefined &&
        user.lastName !== undefined &&
        user.email !== undefined;
}

exports.auditAddUser = auditAddUser;