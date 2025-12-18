import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleFormAction = (formData: FormData) => {
    const query = formData.get("query") as string;

    if (!query || query.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }

    onSubmit(query.trim());
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.link}>
          MovieSearch
        </a>

        <form action={handleFormAction} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
