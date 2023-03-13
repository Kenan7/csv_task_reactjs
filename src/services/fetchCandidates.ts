import { CandidateResponse, initialCandidateResponse } from "../interfaces/candidate";

const TEAMTAILOR_API_KEY = process.env["TEAMTAILOR_API_KEY"] || "Yh3nRWUY9L4dfSk3l_2di1I5NgYebOmloC8I9es-"

const baseHeaders = {
    'Authorization': `Token token=${TEAMTAILOR_API_KEY}`,
    'X-Api-Version': '20210218',
}

const FetchAllCandidates = async (url: string, candidates: CandidateResponse["data"] = []): Promise<CandidateResponse> => {
    try {
        const response = await fetch(url, { headers: baseHeaders });
        const data: CandidateResponse = await response.json();
        const fetchedCandidates = [...candidates, ...data.data]

        if (data.links.next) {
            return FetchAllCandidates(data.links.next, fetchedCandidates);
        } else {
            return {...data, data: fetchedCandidates};
        }
    } catch (error: any) {
        return {...initialCandidateResponse};
    }
}

export default FetchAllCandidates;