import * as React from "react";

import "./App.css";

// Questions:
// 1. Load data from local file (path: “https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json”)
// 2. Use the screenshot as an example, implement a generic function for reading any JSON file in that format, then display the top 12 brands based on audience_size. We always want to have 4 items in one row.
// 3. Add a hover state with a dark, semi-transparent overlay and display the ID of the hovered brand.

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const url =
      "https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json";

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          mode: "cors"
        });

        const json = await response.json();
        
        const sortedData = json.data.sort(
          (a, b) => b.source_items.audience_size - a.source_items.audience_size
        );

        setData(sortedData);

      } catch (e) {
        console.log("err: ", e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h4>Choose a Condé Nast brand's audience:</h4>

      <div className="grid">
        {data.map((item) => (
          <div className="item" key={item.source_items.id}>
            <img
              src={item.social_media_pages.picture}
              alt={item.social_media_pages.name}
            />
            <div className="overlay">
              <div className="text">{item.source_items.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
