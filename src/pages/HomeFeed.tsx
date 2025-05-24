import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  const [user, setUser] = useState({
    name: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data)); // optional
      })
      .catch(() => {
        setUser({ name: "" });
        localStorage.removeItem("user");
      });
  }, []);
  return (
    <div>
      {user.name ? (
        <>
          <h2>Welcome {user.name}</h2>
        </>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
export default HomePage;
