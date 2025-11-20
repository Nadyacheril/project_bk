import { query } from "@/lib/database"; // fungsi query mysql reusable

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const guruId = searchParams.get("guruId");

  if (!guruId) return new Response(JSON.stringify([]), { status: 200 });

  const data = await query(
    "SELECT * FROM pengajuan WHERE guru_id = ? ORDER BY created_at DESC",
    [guruId]
  );

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(req) {
  try {
    const { id, status } = await req.json();
    await query("UPDATE pengajuan SET status = ? WHERE id = ?", [status, id]);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
