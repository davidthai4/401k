import { error } from "console";
import { NextResponse } from "next/server";

let contributionData = {
    contributionType: "percent",
    contributionValue: 6,
    salary: 120000,
    ytdContribution: 7200,
};

// GET request
export async function GET() {

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(contributionData);
}

// POST request
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.contributionType || body.contributionValue === undefined) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        contributionData = {
            ...contributionData,
            contributionType: body.contributionType,
            contributionValue: body.contributionValue,
        };

        return NextResponse.json({
            success: true,
            data: contributionData,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid request" },
            { status: 400 }
        );
    }
}
    
