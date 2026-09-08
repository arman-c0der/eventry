"use server";

import { revalidatePath } from "next/cache";
import { createUser, findUserByCredentials, updateInterest, updateGoing, getEventById } from "../../db/queries";
import { redirect } from "next/navigation";
import { Resend } from "resend";

async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    await createUser(user);
    redirect("/login");
}

async function performLogin(formData) {
    try {
        const credential = {};
        credential.email = formData.get("email");
        credential.password = formData.get("password");
        const found = await findUserByCredentials(credential);
        return found;
    } catch (error) {
        throw error;
    }
}

async function addInterestedEvent(eventId, authId) {
    try {
        await updateInterest(eventId, authId);
    } catch(error) {
        throw error;
    }
    revalidatePath('/');
}

async function addGoingEvent(eventId, userId, user) {
    try {
        await updateGoing(eventId, userId);
        await sendEmail(eventId, user);
    } catch(error) {
      
        throw error;
    }
    revalidatePath('/');
    redirect('/');
}

async function sendEmail(eventId, user) {
    try {
       

        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is missing in .env");
        }

        if (!user?.email) {
            throw new Error("User email is missing");
        }

        const event = await getEventById(eventId);

        if (!event) {
            throw new Error("Event not found");
        }

       

        const resend = new Resend(process.env.RESEND_API_KEY);
        const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;

        const { data, error } = await resend.emails.send({
            from:"onboarding@resend.dev",
            to: user?.email,
            subject: "Successfully Registered for the event!",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F46E5;">Event Registration Confirmed! 🎉</h2>
                    <p style="font-size: 16px; line-height: 1.6;">${message}</p>
                    <br/>
                    <p style="color: #666;">Thank you for registering!</p>
                </div>
            `
        });

        if (error) {
           
            throw new Error(error.message);
        }

      

    } catch (error) {
      
        throw error;
    }
}

export { registerUser, performLogin, addInterestedEvent, addGoingEvent, sendEmail };