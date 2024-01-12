interface User {
    id: string;
    display_name: string;
    images: Image[]
}

interface UserData extends User {
    access_token: string;
}
