// turn of static export
export const dynamic = 'force-dynamic';
// echo json from server
import {db} from "@/db";
import {getExpenses} from "@/server_actions/data";

export async function GET() {
    // fetch data from database
    const expenses = await getExpenses()

    return new Response(JSON.stringify(expenses), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}