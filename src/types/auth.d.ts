// import "next-auth";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     role: "user" | "admin" | "owner";
//     username?: string;
//   }

//   interface Session {
//     user: User & {
//       id: string;
//       role: "user" | "admin" | "owner";
//     };
//   }
// }

// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "user" | "admin" | "owner";
  }

  interface Session {
    user: User & {
      id: string;
      role: "user" | "admin" | "owner";
    };
  }
}
