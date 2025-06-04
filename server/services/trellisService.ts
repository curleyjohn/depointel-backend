import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface CaseSearchParams {
  query: string;
  state: string[];
  sort: string;
  filters: {
    datestart: string,
    dateend: string,
  }
}

interface Case {
  case: string,
  name: string,
  type: string,
  category: string,
  state: string,
  county: string,
  parties: string,
  events: string,
  filing_date: string,
  last_refreshed: string,
  practice_area: string,
  filing_courthouse: string,
  matter_type: string,
  case_outcome_type: string,
  case_last_updated: string,
  case_token: string,
  judge: string,
  is_federal: false
}

interface CaseResponse {
  page: number;
  total_pages: number;
  next_page: string;
  alert: string;
  cases: Case[];
}

class TrellisService {
  private static instance: TrellisService;
  private apiKey: string;
  private apiUrl: string;
  private csrfToken: string;

  private constructor() {
    this.apiKey = process.env.TRELLIS_API_KEY || '';
    this.apiUrl = process.env.TRELLIS_API_URL || '';
    this.csrfToken = process.env.TRELLIS_CSRF_TOKEN || '';
  }

  public static getInstance(): TrellisService {
    if (!TrellisService.instance) {
      TrellisService.instance = new TrellisService();
    }
    return TrellisService.instance;
  }

  private getHeaders() {
    return {
      'Authorization': `Token ${this.apiKey}`,
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': this.csrfToken,
    };
  }

  async getCases(params: CaseSearchParams) {
    try {
      // Using POST /v2/search/cases/ endpoint for case search
      const response = await axios.post(
        `${this.apiUrl}/v2/search/cases`,
        params,
        {
          headers: this.getHeaders()
        }
      );

      const cases: Case[] = [];
      for (const caseData of response.data.cases) {
        const data = { ...caseData };
        // if (caseData.judge) {
        //   const judge = await this.getJudge(caseData.judge);
        //   data.judge = judge;
        // } else {
        //   data.judge = 'N/A';
        // }

        cases.push(data);
      }

      const ret = {
        page: response.data.page,
        total_pages: response.data.total_pages,
        cases: cases
      };

      return ret;
    } catch (error: any) {
      console.error('Error fetching cases from Trellis:', error.response.data);
      throw error;
    }
  }

  async getCaseDetails(caseId: string) {
    try {
      // Using GET /v2/cases/{case_id}/ endpoint for case details
      const response = await axios.get(
        `${this.apiUrl}/v2/case/${caseId}`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching case details from Trellis:', error.message);
      throw error;
    }
  }

  async getJudge(token: string) {
    try {
      const headers = this.getHeaders();
      const response = await axios.get(`${this.apiUrl}/v2/case/${token}/judge`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': headers['Authorization'],
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching judges from Trellis:', error.message);
      throw error;
    }
  }

  async getParties(token: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/v2/case/${token}/parties`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching parties from Trellis:', error.message);
      throw error;
    }
  }
}

export default TrellisService; 