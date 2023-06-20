import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import PostForm from "../components/new/PostForm";
const New = () => {
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };

  const title = "Title";
  const content = "Content that relates to the title.";
  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white relative">
      <Header />
      <div className="md:container mx-auto text-sky-700 dark:text-white">
        <div className="py-6 px-1 mt-4">
          <div className="container mx-auto">
            <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
              <span>
                <Link href="/">AFC Home</Link>
              </span>
              <span>Allfreechips Discussions</span>
            </div>
            <main className='mx-auro my-16 flex w-full max-w-5xl flex-1 space-x-6 py-5 px-6'>
            <div className="w-full lg:w-2/3">
              <PostForm />
            </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default New;
