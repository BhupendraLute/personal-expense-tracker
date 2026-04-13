import { NextResponse } from "next/server";

export const apiSuccess = <T>(data: T, init?: ResponseInit) =>
  NextResponse.json({ success: true, data }, init);

export const apiError = (message: string, status = 400) =>
  NextResponse.json(
    {
      success: false,
      error: message
    },
    { status }
  );
