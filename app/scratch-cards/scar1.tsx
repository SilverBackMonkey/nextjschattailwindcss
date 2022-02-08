
import prisma from "@/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { startOfMonth } from "date-fns";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { playScratch } from "./play";
import { activePrizeChipStyle, isReadyForPlay } from "./shared";

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
        <div className="lg:w-11/12 md:w-90 m-5" style={{backgroundImage:'url("/bg.png")'}}>
          <div className="text-center p-10">
              <Image
              className="mx-auto"
              src="https://www.allfreechips.com/image/i/schead.png"
              width={400}
              height={40}
              alt="AFC Scratch Card"
            />
          </div>
          <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 justify-items-center items-center gap-y-20 gap-x-14 mt-10 mb-5">
              {Array(9)
                .fill(null)
                .map((_, idx) => (

                  <div  key={idx} className="bg-white duration-500 rounded-2xl mb-2 md:h-auto mb-2  shadow-lg lg:transform  hover:scale-105 -translate-y-6">
                    <picture>
                      <img
                        className={`lg:w-28 lg:h-28 md:w-24 md:h-24 sm:w-20 sm:h-20 object-cover rounded-xl ${
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
                    </picture>
                  </div>
                ))}
          </section> 

          <section className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 justify-items-center items-center gap-y-20 gap-x-14 mt-10 mb-5  ">
            <div
              className={`border-spacing-1 p-2 rounded-lg justify-items-center items-center flex flex-col ${
                !isFreePlay &&
                lastOutcome?.prize === activePrizeChipStyle.VALUE_25_USD
                  ? "bg-slate-300"
                  : ""
              }`}
            >
              <h1 className="text-">$25 Cash</h1>
              <div className="flex">
                {[1, 2, 3].map((v) => (
                  <Image
                    key={`25usd-${v}`}
                    className="mx-1"
                    height={40}
                    width={40}
                    src={activePrizeChipStyle.VALUE_25_USD}
                    alt="$25 USD"
                  />
                ))}
              </div>
            </div>
            <div
              className={`border-spacing-1 p-2 rounded-lg justify-items-center items-center flex flex-col ${
                !isFreePlay &&
                lastOutcome?.prize === activePrizeChipStyle.VALUE_25_PTS
                  ? "bg-slate-300"
                  : ""
              }`}
            >
              <div>25 AFC Rewards</div>
              <div className="flex">
                {[1, 2, 3].map((v) => (
                  <Image
                    key={`25pts-${v}`}
                    className="mx-1"
                    height={40}
                    width={40}
                    src={activePrizeChipStyle.VALUE_25_PTS}
                    alt="25 AFC Rewards"
                  />
                ))}
              </div>
            </div>
            <div
              className={`border-spacing-1 p-2 rounded-lg justify-items-center items-center flex flex-col ${
                !isFreePlay &&
                lastOutcome?.prize === activePrizeChipStyle.VALUE_15_PTS
                  ? "bg-slate-300"
                  : ""
              }`}
            >
              <div>15 AFC Rewards</div>
              <div className="flex">
                {[1, 2, 3].map((v) => (
                  <Image
                    key={`15pts-${v}`}
                    className="mx-1"
                    height={40}
                    width={40}
                    src={activePrizeChipStyle.VALUE_15_PTS}
                    alt="15 AFC Rewards"
                  />
                ))}
              </div>
            </div>
            <div
              className={`border-spacing-1 p-2 rounded-lg justify-items-center items-center flex flex-col ${
                !isFreePlay &&
                lastOutcome?.prize === activePrizeChipStyle.VALUE_10_PTS
                  ? "bg-slate-300"
                  : ""
              }`}
            >
              <div>10 AFC Rewards</div>
              <div className="flex">
                {[1, 2, 3].map((v) => (
                  <Image
                    key={`10pts-${v}`}
                    className="mx-1"
                    height={40}
                    width={40}
                    src={activePrizeChipStyle.VALUE_10_PTS}
                    alt="10 AFC Rewards"
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-y-20 gap-x-14 mt-10 mb-5  ">
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
          <div className="text-center p-10 bg-yellow-500/75" >
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
          
        </div>
      </form>
    </main>
  );
}
