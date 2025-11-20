"use client";
import { useEffect, useState } from "react";

export default function Notification({ user }) {
  const [notif, setNotif] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/pengajuan/user")
      .then(res => res.json())
      .then(data => {
        const newNotif = data.filter(p => p.status !== "pending");
        setNotif(newNotif);
      });
  }, [user]);

  return (
    <button className="relative">
      🔔
      {notif.length > 0 && (
        <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      )}
    </button>
  );
}
