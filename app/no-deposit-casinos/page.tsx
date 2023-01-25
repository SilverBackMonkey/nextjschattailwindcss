import NoDepositContent from "./NoDepositContent";
import NoDepositCasinoList from "./NoDepositCasinoList";
import BonusFilter from "../../components/functions/bonusfilter";
import prisma from "@/client";
import { Metadata } from "next";
import monthYear from "@/components/functions/monthYear";

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    monthYear() + " No Deposit Casinos";
  const description =
    "Latest list of current and new no deposit online casinos for "+ monthYear() + ".";
  return {
    title: Title,
    description: description,
  };
}

async function getCasinos() {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      bonuses: {
        some: {
          nodeposit: { gt: 0 },
          freespins: { lt: 1 },
        },
      },
    },
    distinct: ["id"],
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [{ nodeposit: "desc" }, { deposit: "desc" }],
      },
    },
    orderBy: [{ hot: "desc" }, { new: "desc" }],
    take: 5,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);

  return bonus;
}
export default async function Nodeposit() {
  const casinos = await getCasinos();
  return (
    <NoDepositContent>
      <NoDepositCasinoList bonus={casinos} />
    </NoDepositContent>
  );
}

