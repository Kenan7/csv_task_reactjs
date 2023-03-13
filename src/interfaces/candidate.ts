interface RelationshipItem {
    links: {
        self: string;
        related: string;
    };
}

export interface Candidate {
    id: string;
    type: string;
    attributes: {
        created_at: string;
        email: string;
        'first-name': string;
        'last-name': string;
    };
    relationships: {
        job_applications: RelationshipItem;
    };
}

interface PaginationLinks {
    first: string;
    next: string;
    last: string;
}

export interface CandidateResponse {
    data: Candidate[];
    meta: {
        'record-count': number;
        'page-count': number;
    };
    links: PaginationLinks;
}

export const initialCandidateResponse: CandidateResponse = {
    data: [],
    meta: {
        'record-count': 0,
        'page-count': 0,
    },
    links: {
        first: '',
        next: '',
        last: '',
    },
};