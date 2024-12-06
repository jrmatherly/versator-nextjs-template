import { NextResponse } from "next/server";
import { ofetch } from "ofetch";

/**
 * Handles POST requests to the /api/localhost endpoint.
 * Expects a JSON body with a `url` field.
 */
export async function POST(request: Request) {
  console.log("[localhost/POST] Received a POST request.");

  try {
    // Parse the JSON body
    const { url } = await request.json();
    console.log(`[localhost/POST] Parsed URL from request body: ${url}`);

    if (!url) {
      console.error("[localhost/POST] No URL provided in the request body.");
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    // Attempt to fetch the provided URL with no-cors mode
    console.log(`[localhost/POST] Attempting to fetch URL: ${url}`);
    const fetchResponse = await ofetch(url, {
      mode: "no-cors",
    });
    console.log(
      `[localhost/POST] Fetch response status: ${fetchResponse.status}`,
    );

    return NextResponse.json({ done: true });
  } catch (error) {
    console.error("[localhost/POST] Error processing the POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
