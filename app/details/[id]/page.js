import HeroSection from "../../../Components/details/HeroSection"
import EventDetails from "../../../Components/details/EventDetails"
import EventVenue from "../../../Components/details/EventVenue"

import { getEventById } from "../../../db/queries";

export async function generateMetadata({ params }) {
  const { id } = await params; // ✅ await
  const eventInfo = await getEventById(id);
  
  return {
    title: `Eventry - ${eventInfo?.name}`,
    description: eventInfo?.details,
    openGraph: {
      images: [eventInfo?.imageUrl]
    }
  }
}


const EventDetailsPage = async ({params}) => {
  const { id } = await params; // ← await করতে হবে
    const eventInfo = await getEventById(id);

  console.log(eventInfo);
  return (
    <>
      <HeroSection eventInfo={eventInfo} />
      <section class="container">
        <div class="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={eventInfo?.details} swags={eventInfo?.swags}/>
          <EventVenue location={eventInfo?.location}/>
        </div>
      </section>
    </>
  )
}

export default EventDetailsPage