import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TripsPage() {
    const session = await auth();
    const trips = await prisma.trip.findMany({
        where: { userId: session?.user?.id }
    })

    const sortedTrips = [...trips].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    if (!session) {
        return <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
            {" "}
            Please Sign In.
        </div>
    }

    const today = new Date();
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
                    {trips.length === 0 ? "Start palnning your first trip by clicking on the button above." : `You have ${trips.length} ${trips.length > 1 ? "trips" : "trip"} planned.
                    ${upcomingTrips.length > 0 ? `${upcomingTrips.length} upcoming.` : ""}
                    `}
                </p>
            </CardContent>

            <div>
                <h2 className="text-xl font-semibold mb-4">Your Recent Trips</h2>
                {trips.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <h3 className="text-xl font-medium mb-4">No Trips yet.</h3>
                            <p className="text-center mb-4 max-w-md">Start planning your adventure by creating your first trip.</p>
                            <Link href={"/trips/new"}>
                                <Button >Create Trip</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) :(
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sortedTrips.slice(0,6).map((trip,key)=>(
                            <Link key={key} href={" "}></Link>
                        ))}
                    </div>
                )    
                }
            </div>
        </Card>

    </div>
}