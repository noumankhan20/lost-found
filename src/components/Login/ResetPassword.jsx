"use client";
// ℹ️  The reset flow (OTP + new password) is now fully handled inside
//    /forgot-password — this page is no longer needed in the OTP flow.
//    Keeping this file only as a safety redirect for any old token-based
//    links that might still be in circulation.

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/forgot-password");
    }, [router]);

    return (
        <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center">
            <p className="text-gray-400 text-sm">Redirecting…</p>
        </div>
    );
}