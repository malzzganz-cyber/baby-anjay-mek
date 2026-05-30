export const SETTINGS = {
  API_KEY: process.env.RUMAHOTP_API_KEY || "ISI_APIKEY_RUMAHOTP",
  BASE_URL: process.env.RUMAHOTP_BASE_URL || "https://rumahotp.com/api",
  ADMIN_UID: process.env.ADMIN_UID || "ISI_UID_ADMIN",
  DEFAULT_MARKUP: parseInt(process.env.DEFAULT_MARKUP || "10", 10),
};
