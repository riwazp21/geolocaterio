import { NextRequest } from "next/server";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";

const REQUIRED_COLUMNS = ["Address", "City", "State", "Country"];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const apiKey = formData.get("apiKey") as string | null;

    if (!file || !apiKey) {
      return new Response("Missing file or API Key", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(arrayBuffer);

    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
    });

    const headers = Object.keys(records[0]);
    const missing = REQUIRED_COLUMNS.filter((col) => !headers.includes(col));
    if (missing.length > 0) {
      return new Response(
        `CSV is missing required columns: ${missing.join(", ")}`,
        { status: 400 }
      );
    }

    // Process each row
    for (const row of records) {
      const fullAddress = `${row.Address}, ${row.City}, ${row.State}, ${row.Country}`;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        fullAddress
      )}&key=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== "OK" || !data.results[0]) {
        row.Latitude = "N/A";
        row.Longitude = "N/A";
      } else {
        row.Latitude = data.results[0].geometry.location.lat;
        row.Longitude = data.results[0].geometry.location.lng;
      }
    }

    const outputCsv = stringify(records, { header: true });

    return new Response(outputCsv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=processed.csv",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
