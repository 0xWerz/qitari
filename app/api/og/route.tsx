import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              fontSize: 60,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, #00539C, #006FBF)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Qitari
            </div>
            <div
              style={{
                fontSize: 30,
                color: "#666",
                marginTop: 20,
              }}
            >
              Horaires des Trains Algérie
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    const fromCity = from.charAt(0).toUpperCase() + from.slice(1);
    const toCity = to.charAt(0).toUpperCase() + to.slice(1);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 700,
                backgroundImage:
                  "linear-gradient(to bottom right, #00539C, #006FBF)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {fromCity}
            </div>
            <div
              style={{
                margin: "0 40px",
                fontSize: 40,
                color: "#666",
              }}
            >
              vers
            </div>
            <div
              style={{
                fontSize: 60,
                fontWeight: 700,
                backgroundImage:
                  "linear-gradient(to bottom right, #00539C, #006FBF)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {toCity}
            </div>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#666",
              marginTop: 20,
            }}
          >
            Horaires et Prix des Trains SNTF
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
