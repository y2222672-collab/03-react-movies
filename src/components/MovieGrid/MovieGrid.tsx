import type { Movie } from "../../types/movie";
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const defaultPoster =
  "https://dl-preview.csdnimg.cn/71102352/0004-bc4239829f074f37803d5884260995a0_preview-medium.jpg";

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  return (
    <ul className={styles.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className={styles.card}>
            <img
              className={styles.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultPoster
              }
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;

// import { Movie } from "../../types/movie";
// import styles from "./MovieGrid.module.css";

// interface MovieGridProps {
//   movies: Movie[];
//   onSelect: (movie: Movie) => void;
// }

// const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
//   return (
//     <ul className={styles.grid}>
//       {movies.map((movie) => (
//         <li key={movie.id} onClick={() => onSelect(movie)}>
//           <div className={styles.card}>
//             <img
//               className={styles.image}
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               loading="lazy"
//             />
//             <h2 className={styles.title}>{movie.title}</h2>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default MovieGrid;
