

import Header from "../Components/landing/Header";
import EventList from "../Components/landing/EventList"
import {Suspense} from "react"

export default async function Home({searchParams}) {
    const {query} = await searchParams
    return (
        <div>
            <Header />
                <Suspense fallback={<div>Loading...</div>}>
            <EventList query={query} />
            </Suspense>
           
        </div>
    );
}