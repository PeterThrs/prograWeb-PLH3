export class Pelicula {

    id: number;
    titulo: string;
    tituloOriginal: string;
    descripcion: string;
    fechaLanzamiento: string;
    idiomaOriginal: string;
    popularidad: number;
    promedioVotos: number;
    conteoVotos: number;
    esVideo: boolean;
    esParaAdultos: boolean;
    imagenPoster: string;
    imagenFondo: string;
    generos: number[];

    constructor(data: any) {
        this.id = data.id;
        this.titulo = data.title;
        this.tituloOriginal = data.original_title;
        this.descripcion = data.overview;
        this.fechaLanzamiento = data.release_date;
        this.idiomaOriginal = data.original_language;
        this.popularidad = data.popularity;
        this.promedioVotos = data.vote_average;
        this.conteoVotos = data.vote_count;
        this.esVideo = data.video;
        this.esParaAdultos = data.adult;
        this.imagenPoster = data.poster_path;
        this.imagenFondo = data.backdrop_path;
        this.generos = data.genre_ids;
      }

}
