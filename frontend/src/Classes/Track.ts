import { Expose } from "class-transformer";

export default class Track {
    @Expose()
    id: string;
}