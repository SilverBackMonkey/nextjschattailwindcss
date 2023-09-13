import ResultItems from "./ResultItems";

export default function SearchResult({ searchkey }) {
  return (
    <>
      <ResultItems type={1} searchkey={searchkey} category="Casino" />
      <ResultItems type={2} searchkey={searchkey} category="Game" />
    </>
  );
}
