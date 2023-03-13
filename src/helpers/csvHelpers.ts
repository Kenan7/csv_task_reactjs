import { CandidateResponse } from '../interfaces/candidate';

export const transformToCSV = (candidates: CandidateResponse["data"]) => {
    const header = [
      'candidate_id',
      'first_name',
      'last_name',
      'email',
      'job_application_id',
      'job_application_created_at',
    ];

    const rows = candidates.reduce((accumulator: any, candidate: any) => {
      const candidateId = candidate.id;
      const firstName = candidate.attributes['first-name'];
      const lastName = candidate.attributes['last-name'];
      const email = candidate.attributes.email;

      const jobApplications = candidate.relationships['job-applications'].data;

      const jobApplicationRows = jobApplications.map((jobApplication: any) => {
        const jobApplicationId = jobApplication.id;
        const jobApplicationCreatedAt = new Date(
          candidate.attributes['created-at']
        ).toLocaleString();

        return [
          candidateId,
          firstName,
          lastName,
          email,
          jobApplicationId,
          jobApplicationCreatedAt,
        ];
      });

      return accumulator.concat(jobApplicationRows);
    }, []);

    return [header].concat(rows);
  };

export const downloadCSV = (csvData: any) => {
    const csvString = csvData
      .map((row: any) => row.join(','))
      .join('\n');

    const blob = new Blob([csvString], {
      type: 'text/csv;charset=utf-8;',
    });

    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', 'candidates.csv');
      link.style.visibility = 'hidden';

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }
};
