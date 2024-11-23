import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>Whovium</h1>
      <Link href="/boards">View Boards</Link>
    </div>
  );
};

export default HomePage;
