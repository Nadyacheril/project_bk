import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response(JSON.stringify({ role: "unknown", email: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      role: session.user.role,
      email: session.user.email,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
