import db from "@/lib/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "guru") {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const id = formData.get("id");

  await db.query("UPDATE pengajuan SET status = 'diterima' WHERE id = ?", [id]);

  return new Response("", {
    status: 303,
    headers: { Location: "/guru/dashboard" },
  });
}