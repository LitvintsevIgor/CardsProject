export const validation = {
    email(email: string) {
        return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ? 'Incorrect email. Example: address@example.com' : '';
    },
    password(password: string) {
        return !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(password) ? 'Incorrect password. Minimum eight characters, at least one letter and one number.' : '';
    }
}