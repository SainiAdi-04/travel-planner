"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/cards"
import { createTrip } from "@/lib/actions/create-trip"
import { UploadButton } from "@/lib/upload-thing"
import Image from "next/image"
import { useState } from "react"

export default function NewTrip() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    return (
        <div className="max-w-lg mx-auto mt-10">
            <Card>
                <CardHeader>New Trip</CardHeader>
                <CardContent>
                    <form className="space-y-4" action={createTrip}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{" "}Title</label>
                            <input type="text" name="title" placeholder="Japan trip...." className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" placeholder="Trip description..." className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input type="date" name="startDate" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input type="date" name="endDate" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                            </div>
                        </div>

                        <div>
                         <label>Trip Image</label>
                         {imageUrl && (
                            <Image src={imageUrl} alt="Trip Preview" className="w-full mb-4 rounded-md max-h-48 object-cover" 
                            width={300}
                            height={100}
                            />
                         )}   
                         <UploadButton 
                         endpoint='imageUploader' 
                         onClientUploadComplete={(res)=>{
                            if(res && res[0].ufsUrl){
                                setImageUrl(res[0].ufsUrl);
                            }
                         }}

                         onUploadError={(error: Error) => {
                            console.error("Upload failed:", error) 
                         }}  
                         />
                        </div>

                        <Button type="submit" className="w-full">
                            Create Trip
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}