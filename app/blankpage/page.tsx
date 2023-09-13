import { revalidatePath } from "next/cache";
import Link from "next/link";
import prisma from "@/client";
import CasinoDisplayList from "@/components/CasinoDisplayList";
import BonusFilter from "@/components/functions/bonusfilter";
import CasinoHint from "@/components/CasinoHint";
import Notice from "@/components/Notice";
let pageId = 3  //  show 15 results on page load
const addMoreAMount = 5 // number to add with add more
async function getProps({ params }) {
  const pageIdMult = pageId * addMoreAMount;
  // add number per page...

  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      bonuses: { some: { deposit: { gt: 0 } } },
      OR: [
        {
          NOT: { casino_geo: { some: { country: "US", allow: 0 } } },
          casino_geo: { some: { allow: 0 } },
        },
        {
          casino_geo: { some: { allow: 1, country: "US" } },
        },
      ],
    }, 
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
      casino_ratings: {
        select: {
          rating: true
        }
      }
    },
    orderBy: [{ hot: "desc" }, { new: "desc" },{id:"desc"}],
    take: pageIdMult,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}
export const revalidate = 300;
export const dynamic = "error";

export default async function Page(params) {
 const  hint_text = 'Hint';
 const hint_title = 'Title';
  async function addItem(formData) {
    'use server'
    
     pageId = Number(formData.get('pageNumber')) + 1
     revalidatePath("CURRENT PAGE");
  }
  const props = await getProps({ params });
  const bdata = props.bonus;
  let showMore = "No More To Show";
  if ((addMoreAMount * pageId) == bdata.length){ // If equal we prob have more still
    showMore = "Show More";
  }
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-1">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="../">AFC Home</Link> / PAGE
            </span>
          </div>
        </div>
      </div>
      <div className="md:px-24 py-8 text-center mt-2 p-2">
      <h2 className="text-3xl font-semibold px-8 md:text-6xl md:">
        Header
      </h2>
      <p className="py-6 font-medium md:text-xl md:my-10">
        TEXT
      </p>
      <CasinoDisplayList data={bdata} />
      <CasinoHint title = {hint_title} text={hint_text}/>
      <Notice />
      <form action={addItem} id="showMore">
       <input type="hidden" name="pageNumber" value={pageId} />
      <button type="submit" className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded text-base font-medium md:my-6">{showMore}</button>
    </form>
      </div>
     
    </div>
  );
}