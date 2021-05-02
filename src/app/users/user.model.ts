import { Movie } from "../shared/movies/movie.model";

export class User {
    _id?: string;
    userName: string;
    userEmail: string;
    userCpf: string;
    movies?: Movie[];
}