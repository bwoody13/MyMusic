import { Expose } from "class-transformer";

export default class User {
    @Expose()
    id: string;
    @Expose()
    display_name: string;
    @Expose()
    images: {url: string}[]
}
