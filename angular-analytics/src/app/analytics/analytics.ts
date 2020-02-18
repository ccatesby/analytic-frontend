export interface Analytics {
    countries: Array<Result>;
    pagePaths: Array<string>;
    count: Count,
    browsers: Array<string>,
  }

export interface Result {
  _id: string;
  count: number;
}

export interface Count {
  totalPageVisits: number;
  returningUsers: number;
  totalUsers: number;
};