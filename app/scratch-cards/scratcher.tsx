import prisma from "@/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { startOfMonth } from "date-fns";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { playScratch } from "./play";
import { activePrizeChipStyle, isReadyForPlay } from "./shared";
import PayItem from "./_components/PayItem";
import { last } from "cheerio/lib/api/traversing";

export async function Scratcher() {
  const session = await getServerSession(authOptions);
  //@ts-expect-error
  const userEmail: string = session?.user?.email;
  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });
  if (user == null) {
    return <main />;
  }

  // TODO: handle unknown user
  const {
    isReady: canPlay,
    isFreePlay,
    humanWhen,
    lastOutcome,
    points,
  } = await isReadyForPlay(user);

  async function play(data: FormData) {
    "use server";
    // TODO: error handling
    const response = await playScratch(data);
    revalidatePath("/scratch-cards");
  }

  const thisMonthWinners = await prisma.scratchCardAward.findMany({
    where: { createdAt: { gte: startOfMonth(new Date()) } },
    include: {
      user: { select: { name: true, email: true, createdAt: true } },
    },
    orderBy: { user: { createdAt: "desc" } },
  });
  return (
    <main>
      <form action={play}>
        <div className="md:w-90 m-2 flex">
          {/* <div className="w-100">
            <Image
              className="mx-auto"
              src="https://www.allfreechips.com/image/i/schead.png"
              width={400}
              height={40}
              alt="AFC Scratch Card"
            />
          </div> */}
          <div className="flex-1">
            <div className="text-center w-96 p-0">
                <Image
                className="mx-auto"
                src="https://www.allfreechips.com/image/i/schead.png"
                width={400}
                height={40}
                alt="AFC Scratch Card"
              />
            </div>
            <div className="text-center p-2 w-96" style={{backgroundImage:'url("/background/scratch_bg.png")'}}>
              <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 justify-items-center items-center gap-y-8 gap-x-10 mt-4 mb-4" style={{height:"310px"}}>
                  {Array(9)
                    .fill(null)
                    .map((_, idx) => (
                        <img key={idx}
                          className={`object-cover rounded-md 
                          ${
                            canPlay && isFreePlay ? "h-20" : "h-16"
                          }
                          ${
                            lastOutcome != null &&
                            lastOutcome.table[idx] === lastOutcome.prize
                              ? "bg-slate-300"
                              : ""
                            
                          }`}
                          src={
                            canPlay && isFreePlay
                              ? `data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
                              : lastOutcome != null
                              ? lastOutcome.table[idx]
                              : `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`
                          }
                          alt="Icon"
                        />
                    ))}
              </section> 
              <section className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 justify-items-center items-center gap-y-2 gap-x-14 mt-4 mb-4">
                <PayItem text="$25 Cash" avatar={activePrizeChipStyle.VALUE_25_USD} isFreePlay={isFreePlay} lastOutcome={lastOutcome} />
                <PayItem text="25 AFC Rewards" avatar={activePrizeChipStyle.VALUE_25_PTS} isFreePlay={isFreePlay} lastOutcome={lastOutcome} />
                <PayItem text="15 AFC Rewards" avatar={activePrizeChipStyle.VALUE_15_PTS} isFreePlay={isFreePlay} lastOutcome={lastOutcome} />
                <PayItem text="10 AFC Rewards" avatar={activePrizeChipStyle.VALUE_10_PTS} isFreePlay={isFreePlay} lastOutcome={lastOutcome} />
              </section>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-md">
              Add New Text
            </h1>
          </div>
                    
        </div>
        <div className="text-center p-2 w-96">
         
          <section className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-y-20 gap-x-14 mt-4 mb-4">
            <button
              disabled={!(canPlay && isFreePlay)}
              type="submit"
              className="disabled:opacity-25 border border-neutral-800 py-2 px-4 font-bold rounded-full bg-white text-sky-700 dark:bg-zinc-800 dark:text-white"
            >
              Free Play
            </button>
            <button
              disabled={!(canPlay && !isFreePlay)}
              type="submit"
              className="disabled:opacity-25 ml-2 border border-neutral-800 py-2 px-4 font-bold rounded-full bg-white text-sky-700 dark:bg-zinc-800 dark:text-white"
            >
              Point Play ({points})
            </button>
          </section>
        </div>
          
          <div className="text-center p-4" >
              {canPlay ? (
                isFreePlay ? (
                <h1 className="font-bold text-3xl">Click Free Play now to claim your prize!</h1>
                  ) : (
                    <h1 className="font-bold text-3xl">
                      Play now using 1 AFC Reward Point, or wait {humanWhen} to play
                      again for free!
                    </h1>
                  )
                ) : (
                  <h1 className="font-bold text-3xl">Free play available again in {humanWhen}.</h1>
                )}
          </div>
      </form>
    </main>
  );
}
