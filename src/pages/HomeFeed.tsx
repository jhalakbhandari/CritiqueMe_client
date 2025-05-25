function HomePage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
export default HomePage;
