export default function Title({ locked }) {
  //return <h1 className="title">Fancy Counter</h1>;
  return (
    <h1 className="title">
      {locked ? (
        <span>
          LIMIT REACHED BUY <b>PRO</b> &gt;5
        </span>
      ) : (
        "Fancy Counter"
      )}
    </h1>
  );
}

// export default Title;
