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
        <div className="w-100 md:w-90 lg:w-1/2 m-5">
          <div className="w-100">
            <Image
              className="mx-auto"
              src="https://www.allfreechips.com/image/i/schead.png"
              width={400}
              height={40}
              alt="AFC Scratch Card"
            />
          </div>
          <div>
            <div className="grid grid-cols-3 gap-4 bg-slate-100">
              {Array(9)
                .fill(null)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="relative m-2 flex content-center w-auto h-32"
                  >
                    <Image
                      className={`mx-auto rounded-lg ${
                        lastOutcome != null &&
                        lastOutcome.table[idx] === lastOutcome.prize
                          ? "bg-slate-300"
                          : ""
                      }`}
                      fill
                      src={
                        canPlay && isFreePlay
                          ? `data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
                          : lastOutcome != null
                          ? lastOutcome.table[idx]
                          : `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`
                      }
                      alt="Icon"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-slate-100 ">
            <div
              className={`border-spacing-1 p-2 rounded-lg ${
                !isFreePlay &&
                lastOutcome?.prize === activePrizeChipStyle.VALUE_25_USD
                  ? "bg-slate-300"
                  : ""
              }`}
            >
              <div>$25 Cash</div>
              <div className="flex">
                {[1, 2, 3].map((v) => (
                  <Image
                    key={`25usd-${v}`}
                    className="mx-1"
                    height={25}
                    width={25}
                    src={activePrizeChipStyle.VALUE_25_USD}
                    alt="$25 USD"
                  />
                ))}
              </div>
            </div>
            <div
              className={`border-spacing-1 p-2 rounded-lg ${
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
                    height={25}
                    width={25}
                    src={activePrizeChipStyle.VALUE_25_PTS}
                    alt="25 AFC Rewards"
                  />
                ))}
              </div>
            </div>
            <div
              className={`border-spacing-1 p-2 rounded-lg ${
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
                    height={25}
                    width={25}
                    src={activePrizeChipStyle.VALUE_15_PTS}
                    alt="15 AFC Rewards"
                  />
                ))}
              </div>
            </div>
            <div
              className={`border-spacing-1 p-2 rounded-lg ${
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
                    height={25}
                    width={25}
                    src={activePrizeChipStyle.VALUE_10_PTS}
                    alt="10 AFC Rewards"
                  />
                ))}
              </div>
            </div>
          </div>
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
          {canPlay ? (
            isFreePlay ? (
              <p>Click Free Play now to claim your prize!</p>
            ) : (
              <p>
                Play now using 1 AFC Reward Point, or wait {humanWhen} to play
                again for free!
              </p>
            )
          ) : (
            <p>Free play available again in {humanWhen}.</p>
          )}
        </div>
      </form>
    </main>
  );
}
