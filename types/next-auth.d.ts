import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "entrepreneur" | "funder";
      phone?: string;
      businessName?: string;
      organizationName?: string;
    };
  }
}
