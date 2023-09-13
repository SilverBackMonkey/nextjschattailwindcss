
import prisma from "@/client";
import ContactForm from "../components/ContactForm";

export default async function Dash() {

    async function sendMessage ({name, email, message}) {
        "use server";
        try {
            const result = await prisma.contactMessage.create({
                data: {
                    author: { connect: { email: email } },
                    name: name,
                    message: message,
                    toEmail: "support@allfreechips.com"
                }
            });
            return result;
        }
        catch(error) {
          console.log(error)
          return false;
        } 
      }

    return (            
        <section className="relative py-12 bg-gray-50 overflow-hidden">
            <div className="relative z-10 container px-4 mx-auto">
                <div className="flex flex-wrap -m-8">
                    <div className="w-full md:w-1/2 p-8">
                        <div className="flex flex-col justify-between h-full">
                            <div className="mb-12 md:max-w-md block">
                                <p className="my-6 text-sm text-sky-600 font-bold uppercase tracking-px" >Get a question?</p>
                                <p className="mb-6 text-sm text-sky-600 font-bold uppercase tracking-px" >Feel free to contact us!</p>
                                <h2 className="text-3xl md:text-5xl xl:text-7xl font-bold font-heading tracking-px-n leading-none" >Get in touch and let us know how we can help.</h2>
                                <h2 className="text-2xl mt-8">Submit your info and we&apos;ll get back to you as soon as possible.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-8">
                        <ContactForm sendMessage={sendMessage}/>
                    </div>
                </div>
            </div>
        </section>
  );
}

export const metadata = {
  title: "Allfreechips Casino Content",
  description:
    "",
};
