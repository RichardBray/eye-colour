import type { ResultArr } from "./index";

function Layout(props: Record<string, unknown>) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Children Eye Colour</title>
        <link rel="preload stylesheet" href="/static/style.css" as="style" />
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export function RootPage(props: { result?: ResultArr }) {
  const [error, result] = props.result || [];

  return (
    <Layout>
      <h1>Children Eye Colour</h1>
      <form action="/submit-form" method="post">
        <p>
          <label for="person_1">Eye Color 1</label>
          <br />
          <input type="text" id="person_1" name="person_1" required />
        </p>
        <p>
          <label for="person_2">Eye Color 2</label>
          <br />
          <input type="text" id="person_2" name="person_2" required />
        </p>
        <p>
          <label for="children">No. of Children</label>
          <br />
          <input type="number" id="children" name="children" required />
        </p>
        <button type="submit">Submit</button>
      </form>

      {result ? (
          <p>
            <p>Eye Color: {result.color}</p>
            <p>Probability: {result.probability}</p>
          </p>

      ) : ""}

      {error ? (
          <p style={{ color: "red" }}>Error: {error.message}</p>
      ) : ""}
    </Layout>
  );
}