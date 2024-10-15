export type TypesSite = {
  id: number;
  userId: number;
  name: string;
  description: string;
  link: string;
  status: string;
  createdAt: string;
};

export type TypesLog = {
  id: number;
  siteID: number;
  name: string;
  uniqueClient: string;
  router: string;
  settings: SettingsLog;
};

export type TypesSettings = {
  timestamp: string;
  url: boolean;
  methods: boolean;
  statusCode: boolean;
  responseMessage: boolean;
  description: boolean;
  ip_address: boolean;
  gps: boolean;
  username: boolean;
  email: boolean;
  cookie: boolean;
  localStorage: boolean;
  session: boolean;
  authenticate: boolean;
};

type SettingsLog = {
  timestamp: string; // Выжные данные в log
  url: boolean;
  methods: boolean;
  statusCode: boolean;
  responseMessage: boolean;
  description: boolean; // Данные второстепенной степени
  ip_address: boolean;
  gps: boolean;
  username: boolean;
  email: boolean;
  cookie: boolean;
  localStorage: boolean;
  session: boolean;
  authenticate: boolean;
};

type Test = {
  title: string;
};
