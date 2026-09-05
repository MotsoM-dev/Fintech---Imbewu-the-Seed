// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

// Get users from localStorage (client-side only)
// For server-side, we'll use a global variable
let users: any[] = [];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        phone: { label: "Phone", type: "text" },
        role: { label: "Role", type: "text" },
        action: { label: "Action", type: "text" },
        // Entrepreneur fields
        businessName: { label: "Business Name", type: "text" },
        businessType: { label: "Business Type", type: "text" },
        industry: { label: "Industry", type: "text" },
        yearsInOperation: { label: "Years in Operation", type: "text" },
        employeeCount: { label: "Employee Count", type: "text" },
        monthlyRevenue: { label: "Monthly Revenue", type: "text" },
        businessLocation: { label: "Business Location", type: "text" },
        // Funder fields
        organizationName: { label: "Organization Name", type: "text" },
        organizationType: { label: "Organization Type", type: "text" },
        investmentFocus: { label: "Investment Focus", type: "text" },
        investmentRange: { label: "Investment Range", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password, action } = credentials;

        // For hackathon: initialize users from localStorage if available
        // This is a hack to persist users between server restarts
        if (typeof global !== 'undefined' && (global as any).__users) {
          users = (global as any).__users;
        } else {
          // Default demo users
          users = [
            {
              id: "1",
              email: "entrepreneur@imbewu.com",
              name: "Demo Entrepreneur",
              password: "password",
              role: "entrepreneur",
              phone: "+27 82 123 4567",
              businessName: "Zanele's Spaza Shop",
              businessType: "Sole Proprietorship",
              industry: "Retail",
              yearsInOperation: "3-5",
              employeeCount: "2-5",
              monthlyRevenue: "R10,000-R25,000",
              businessLocation: "Cape Town, Western Cape",
            },
            {
              id: "2",
              email: "funder@imbewu.com",
              name: "Demo Funder",
              password: "password",
              role: "funder",
              phone: "+27 82 987 6543",
              organizationName: "ABC Investment Partners",
              organizationType: "Venture Capital",
              investmentFocus: "Early Stage",
              investmentRange: "R100,000-R500,000",
            }
          ];
          if (typeof global !== 'undefined') {
            (global as any).__users = users;
          }
        }

        // Handle Sign Up
        if (action === "signup") {
          const existingUser = users.find((u: any) => u.email === email);
          if (existingUser) {
            throw new Error("User already exists");
          }

          const newUser: any = {
            id: String(Date.now()),
            email,
            password,
            name: credentials.name || email.split('@')[0],
            phone: credentials.phone || "",
            role: credentials.role || "entrepreneur",
            created_at: new Date().toISOString(),
          };

          // Add role-specific fields
          if (credentials.role === "entrepreneur") {
            newUser.businessName = credentials.businessName || "";
            newUser.businessType = credentials.businessType || "";
            newUser.industry = credentials.industry || "";
            newUser.yearsInOperation = credentials.yearsInOperation || "";
            newUser.employeeCount = credentials.employeeCount || "";
            newUser.monthlyRevenue = credentials.monthlyRevenue || "";
            newUser.businessLocation = credentials.businessLocation || "";
          } else if (credentials.role === "funder") {
            newUser.organizationName = credentials.organizationName || "";
            newUser.organizationType = credentials.organizationType || "";
            newUser.investmentFocus = credentials.investmentFocus || "";
            newUser.investmentRange = credentials.investmentRange || "";
          }

          users.push(newUser);
          if (typeof global !== 'undefined') {
            (global as any).__users = users;
          }

          console.log("✅ User registered:", { email, role: credentials.role });
          const { password: _, ...userWithoutPassword } = newUser;
          return userWithoutPassword;
        }

        // Handle Sign In
        const user = users.find((u: any) => u.email === email);
        if (!user) {
          return null;
        }

        if (user.password !== password) {
          return null;
        }

        console.log("✅ User signed in:", { email, role: user.role });
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as any;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = customUser.role || "";
        token.phone = customUser.phone || "";
        token.businessName = customUser.businessName || "";
        token.organizationName = customUser.organizationName || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const customSession = session.user as any;
        customSession.id = token.id;
        customSession.role = token.role;
        customSession.phone = token.phone;
        customSession.businessName = token.businessName;
        customSession.organizationName = token.organizationName;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "hackathon-secret-key",
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };