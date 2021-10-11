import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./header.css";
import "./content.css";
import "./article.css";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const open = (url) => window.open(url);
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  // SET your API KEY of unsplash.com/developers in .env file
                  Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
                },
              }
            );
            const data = await response.json();
            if (data.results) setPhotos(data.results);
          }}
        >
          <Form style={{ width: "100%" }}>
            <Field name="search" placeholder="Search an image" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p>{[photo.description, photo.alt_description].join(" -")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
