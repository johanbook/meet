export type HealthCheckStatus = "ok" | "error";

export class HealthCheckDetails {
  status!: HealthCheckStatus;
}
