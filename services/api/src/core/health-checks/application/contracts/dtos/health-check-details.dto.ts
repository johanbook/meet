export type HealthCheckStatus = "ok" | "error";

export class HealthCheckDetails {
  errors!: unknown[];
  status!: HealthCheckStatus;
}
