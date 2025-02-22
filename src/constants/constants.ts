import { t } from "i18next";
export const CLIENT = 1;
export const SERVICE_PROVIDER_FREELANCE = 2;
export const SERVICE_PROVIDER_FIRM = 3;
export const SERVICE_PROVIDER_CONTRACTOR = 4;
export const SERVICE_PROVIDER_CRAFTSMEN = 5;
export const SUPPLIER = 6;
export const ADMIN = 7;
export const SERVICE_PROVIDER_SERVICE_TYPE = 1;
export const SUPPLIER_SERVICE_TYPE = 2;
export const USER_TYPE = [
  { label: t("user_type.client"), value: CLIENT },
  { label: t("user_type.design_freelance"), value: SERVICE_PROVIDER_FREELANCE },
  { label: t("user_type.design_firm"), value: SERVICE_PROVIDER_FIRM },
  { label: t("user_type.contractor"), value: SERVICE_PROVIDER_CONTRACTOR },
  { label: t("user_type.craftsmen"), value: SERVICE_PROVIDER_CRAFTSMEN },
  { label: t("user_type.supplier"), value: SUPPLIER },
];
export const PROFESSIONALS = [
  SERVICE_PROVIDER_CRAFTSMEN,
  SERVICE_PROVIDER_CONTRACTOR,
  SERVICE_PROVIDER_FIRM,
  SERVICE_PROVIDER_FREELANCE,
];
export const YEARS_OF_EXPERIENCE = [
  { label: t("years_of_experience.less_than_5_years"), id: 1 },
  { label: t("years_of_experience.between_5_to_10_years"), id: 2 },
  { label: t("years_of_experience.between_10_to_20_years"), id: 3 },
  { label: t("years_of_experience.more_than_20_years"), id: 4 },
];
export const VOLUME_OF_WORK = [
  { label: t("volume_of_work.less_than_5"), id: 1 },
  { label: t("volume_of_work.between_5_to_10"), id: 2 },
  { label: t("volume_of_work.between_10_to_20"), id: 3 },
  { label: t("volume_of_work.between_20_to_50"), id: 4 },
  { label: t("volume_of_work.more_than_20"), id: 5 },
];
export const NUMBER_OF_EMPLOYEES = [
  { label: t("number_of_employees.less_than_20"), id: 1 },
  { label: t("number_of_employees.between_50_to_100"), id: 2 },
  { label: t("number_of_employees.between_100_to_500"), id: 3 },
  { label: t("number_of_employees.more_than_500"), id: 4 },
];
export const SUPPLIER_CLASSIFICATIONS = [
  { label: t("MANUFACTURE"), id: 8 },
  { label: t("AGENT"), id: 9 },
  { label: t("HYPERSHOP"), id: 10 },
  { label: t("DISTRIBUTER"), id: 11 },
];
export const CONTRACTOR_CLASSIFICATIONS = [
  { label: t("classifications.first"), id: 1 },
  { label: t("classifications.second"), id: 2 },
  { label: t("classifications.third"), id: 3 },
  { label: t("classifications.fourth"), id: 4 },
  { label: t("classifications.fifth"), id: 5 },
  { label: t("classifications.sixth"), id: 6 },
  { label: t("classifications.seventh"), id: 7 },
];
export const PRICE_RANGE = [
  { label: "$", id: 1 },
  { label: "$$", id: 2 },
  { label: "$$$", id: 3 },
  { label: "$$$$", id: 4 },
];
export const EXCEPTIONS = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  PRECONDITION_REQUIRED: 428,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
};

export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const CRAFTSMEN_ID = 751;
export const SUPPLIER_ID = 752;

export const file_types = [
  { label: t("CV"), value: 1 },
  { label: t("CR"), value: 2 },
  { label: t("TAX_CARD"), value: 3 },
  { label: t("CONTRACT"), value: 4 },
  { label: t("GRADUATION_CERTIFICATE"), value: 5 },
  { label: t("CERTIFICATES"), value: 6 },
  { label: t("OTHER"), value: 7 },
];

export const ORDER_STATUS = [
  { label: t("order.orders.status.all"), value: 0 },
  { label: t("order.orders.status.pending"), value: 1 },
  { label: t("order.orders.status.partialy_accepted"), value: 2 },
  { label: t("order.orders.status.declined"), value: 3 },
  { label: t("order.orders.status.complated"), value: 4 },
];
export const RFP_STATUS = [
  { label: t("All"), value: 0 },
  { label: t("rfqs.status_enum.pending"), value: 1 },
  { label: t("rfqs.status_enum.in_progress"), value: 2 },
  { label: t("rfqs.status_enum.complated"), value: 3 },
  { label: t("rfqs.status_enum.declined"), value: 4 },
];

export const BusinessUserInvitaionStatus = [
  { label: t("PENDING"), value: 1 },
  { label: t("IN_PROGRESS"), value: 2 },
  { label: t("COMPLETED"), value: 3 },
  { label: t("DECLINE"), value: 4 },
  { label: t("ACCEPTED_FOR_ANOTHER_USER"), value: 5 },
];

export enum RFPStatusEnum {
  Pending = 1,
  InProgress = 2,
  Completed = 3,
  Declined = 4,
}
export enum InvitationStatusEnum {
  PENDING = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  DECLINE = 4,
  ACCEPTED_FOR_ANOTHER_USER = 5,
}
