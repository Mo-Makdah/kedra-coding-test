import styles from "./App.module.css";
import Router from "./router/AppRoutes";

function App() {
  return (
    <div className={styles.page}>
      <Router />
    </div>
  );
}

export default App;
