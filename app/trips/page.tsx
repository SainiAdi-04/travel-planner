import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TripsPage(){
    const session =await auth();
    const trips=await prisma.trip.findMany({
        where:{userId:session?.user?.id}
    })

    const sortedTrips=[...trips].sort((a,b)=>new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    if(!session){
        return <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
            {" "}
            Please Sign In.
        </div>
    }

    const today= new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingTrips = sortedTrips.filter(trip => new Date(trip.startDate) >= today);

    return <div className="space-y-6 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href={"/trips/new"}>
        <Button >New Trip</Button>
        </Link>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Welcome Back, {session.user?.name}</CardTitle>
            </CardHeader>

            <CardContent>
                <p>
                    {trips.length===0?"Start palnning your first trip by clicking on the button above.":`You have ${trips.length} ${trips.length > 1 ? "trips" : "trip"} planned.`}
                </p>
            </CardContent>
        </Card>

    </div>
}