import { CandidateResponse } from './interfaces/candidate';
import FetchAllCandidates from './services/fetchCandidates';
import {transformToCSV, downloadCSV} from './helpers/csvHelpers';

function App() {
  const GenerateCandidatesCSV = () => {

    FetchAllCandidates(
      'https://api.teamtailor.com/v1/candidates?page[size]=30&include=job-applications', []
    ).then((candidateResponse: CandidateResponse) => {
      const csvData = transformToCSV(candidateResponse.data);
      downloadCSV(csvData);
    });
  }

  return (
    <div className="App">
        <section className="hero is-black is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title is-size-3 has-text-white">Click to download candidates list as CSV</h1>
              <button
                className="button is-outlined is-large is-light"
                onClick={GenerateCandidatesCSV}>Download</button>
            </div>
          </div>
        </section>
    </div>
  );
}

export default App;