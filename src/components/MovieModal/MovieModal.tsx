import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie.ts";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.querySelector("#modal-root") || document.body;

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return createPortal(
    <div
      className={css.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        <img src={imageUrl} alt={movie.title} className={css.image} />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
export default MovieModal;
