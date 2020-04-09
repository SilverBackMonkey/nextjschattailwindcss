"use client";

import React, { lazy, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import CasinoSwitch from './CasinoSwitch';
import CasinoRangeSlider from './CasinoRangeSlider';
import BonusFilter from './functions/bonusfilter';
import CasinoDisplayList from './CasinoDisplayList';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const DynamicMultiSelect = dynamic(() => import("./common/MultiSelect"), {
    ssr: true,
});

const DynamicSingleSelect = dynamic(() => import("./common/SingleSelect"), {
    ssr: true,
});

interface props {
    defaultCondition: any,
    saveFilterCondition: (payload: any) => any,
    getCasinosWithLocation: (softwares: any) => any
}

const locationList = [
    {   
        value: 1,
        label: 'US'
    },
    {   
        value: 2,
        label: 'CA'
    },
    {
        value: 3,
        label: 'GB'
    },
    {   
        value: 4,
        label: 'NZ'
    }
];

const CasinoFilter: React.FC<props> = ({ defaultCondition, saveFilterCondition, getCasinosWithLocation }) => {
    
    const dCond = JSON.parse(defaultCondition?.condition ? defaultCondition?.condition : '{}' );

    const [casinos, setCasinos] = useState<any[]>([]);
    const [fCasinos, setFCasinos] = useState<any[]>([]);
    const [softwares, setSoftwares] = useState<any[]>(dCond?.softwares);
    const [softwareList, setSoftwareList] = useState<any[]>([]);

    const [jurisdictions, setJurisdictions] = useState<any[]>([]);
    const [fJurisdictions, setFJurisdictions] = useState<any[]>(dCond?.licenseHolders);
    
    const [noBonus, setNoBonus] = useState(dCond?.noBonus ? true: false);
    const [noDepositBonus, setNoDepositBonus] = useState( dCond?.freeBonus ? true: false );
    const [bonus, setBonus] = useState(dCond?.bonusPercent ? dCond?.bonusPercent : 100);
    const [dealer, setDealer] = useState(dCond?.liveDealers? true: false);
    const [mobile, setMobile] = useState(dCond?.mobileVersion? true: false);
    const [banks, setBanks] = useState<any[]>([]);
    const [fBanks, setFBanks] = useState<any[]>(dCond?.banks);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState<any>(dCond?.location ? dCond?.location : locationList[0]);

    /**
     * initialize casinos and conditions...
     */
    useEffect(() => {
        setLoading(true);
        Block.dots('.casino-filter-condition',
        {
            backgroundColor: '#21669e1f',
            svgColor:'#21669e'
        });
        async function fetchCasinos() {
            debugger;
            const result = BonusFilter(await getCasinosWithLocation(location?.label));
            setCasinos(result);
            let sList: any[] = []
            let sSoftList: any[] = [];
            let bList: any[] = [];

            /**
             * catch all multi select options from casino data...
             */
            result?.map((item) => {
                let jurisdictions = item.jurisdictions;
                jurisdictions.map((jurisdiction) => {
                    if(!sList?.find((s) => s.label === jurisdiction?.jurisdiction_data?.name))
                    sList.push({
                        value:jurisdiction.jurisdiction_data?.id,
                        label: jurisdiction.jurisdiction_data?.name 
                    });
                });

                item?.softwares?.map((s) => {
                    if(!sSoftList.find((softItem) => softItem?.label === s?.softwarelist?.software_name)) {
                        sSoftList.push({
                            value: s.id,
                            label: s?.softwarelist?.software_name
                        });
                    }
                })
                item?.banklist?.map((b) => {
                    if(!bList?.find((bnk) => bnk?.label === b?.bank_data?.display)) {
                        bList.push({
                            value: b?.id,
                            label: b?.bank_data?.display
                        });
                    }
                })
            })

            sList.sort((a,b) => a.label - b.label);
            setJurisdictions(sList);            
            sSoftList.sort((a,b) => a.label - b.label);
            bList.sort((a,b) => a.label - b.label);

            setSoftwareList(sSoftList);   
            setBanks(bList);
            const filteredData = filterCasinos(result);
            setFCasinos(filteredData);
            Block.remove('.casino-filter-condition');
            setLoading(false);
        }
        if(location)
            fetchCasinos();
    }, [location])

    /**
     * api to filter with the filter condition when even one condition has been changed...
     */
    useEffect(() => {
        let fList = filterCasinos(casinos);
        setFCasinos(fList);
    }, [noBonus, noDepositBonus, softwares, bonus, fJurisdictions, fBanks, mobile, dealer]);

    /**
     * 
     * @param list multi select options ( key: value pairs, ex)
     * @param fList 
     * @returns 
     */
    const listByIdsN2N = (list: any[], fList: any[] ) => {
        let isContain = true;
        
        fList.map((item) => {
            if(!list.find((i) => i.id === item.value))
                isContain = false;
        })

        return isContain;
    }

    /**
     * 
     * @param casinos all casinos in current location(ex, in US)
     * @returns void setFilteredCasinos
     */
    const filterCasinos = (casinos: any) => {
        // filter by bonus percent
        let bdata:any[] = casinos?.filter((c) => c.bonus_percent >= (bonus - 100));
        // filter by no deposit bonus
        if(noBonus)
            bdata = bdata?.filter((p) => (!p.nodeposit || p.nodeposit === 0));
        // filter by free spin bonus
        if(noDepositBonus)
            bdata = bdata?.filter((item)=> (item.freespins > 0));
        // filter by live dealer
        if(dealer)
            bdata = bdata?.filter((item) => (item.livegames > 0));
        // filter by mobile version
        if(mobile)
            bdata = bdata?.filter((item) => (item.mobile > 0));
        // filter by softwares
        if(softwares?.length > 0) {
            let filteredResult : any[] = [];
            bdata?.map((item) => {
                let isContain = true;
                softwares?.map((s) => {
                    if(!item?.softwares.find((ds) => ds?.softwarelist?.software_name === s.label))
                        isContain = false;
                });
                if(isContain) filteredResult.push(item);
            })
            bdata = bdata?.filter((item) => listByIdsN2N(item.softwares, softwares));
        }
        // filter by License holder
        if(fJurisdictions?.length > 0) {
            let filterResult : any[] = [];

            bdata?.map((item) => {
                let isContain = true;
                fJurisdictions?.map((fJurisdiction) => {
                    if(! item.jurisdictions.find((i) => i.jurisdiction_data.name === fJurisdiction.label))
                        isContain = false;
                })
                if(isContain) filterResult.push(item);
            })

            bdata = filterResult;                
        }
        // filter by banks
        if(fBanks?.length > 0) {
            let fResult: any[] = [];
            bdata?.map((item) => {
                let isContain = true;

                fBanks?.map((bank) =>{
                    if(!item?.banklist.find((i) => i?.bank_data?.display === bank.label))
                        isContain = false;
                })
                if(isContain) 
                    fResult.push(item);
                
            })
            bdata = fResult;
        }
        return bdata;
    }
    
    /**
     * 
     * @param softList selected softwareList in softwares multi select component 
     */
    const selectSoftwares = (softList: any) => {
        if(softList?.length === 0) {
            setSoftwares([]);
        }
        else {
            setSoftwares(softList);
        }
    }

    /**
     * 
     * @param jurisdictionList selected jurisdiction List in License holder multi select component
     */
    const selectJurisdictions = (jurisdictionList: any) => {
        if(jurisdictionList?.length === 0) {
            setFJurisdictions([]);
        }
        else {
            // let selectedJurisdictions = jurisdictionList?.map((jurisdiction: any) => {
            //     return {
            //         id: jurisdiction?.value,
            //         name: jurisdiction?.label
            //     }
            // })
            setFJurisdictions(jurisdictionList);
        }
    }

    /**
     * 
     * @param item selected location in location single select component 
     */
    const selectLocation = (item: any) => {
        if(item?.label)
            setLocation(item);
        else
            setLocation({
                value: 1,
                label: 'US'
            });
    }

    /**
     * api to save retrievement condition when click "save search" button 
     */
    const saveSearch = async (e) => {
        e.preventDefault();
        Block.dots(".casino-filter-condition",
        {
            backgroundColor: '#21669e1f',
            svgColor:'#21669e'
        });

        const payload = {
            location: location,
            noBonus: noBonus,
            freeBonus: noDepositBonus,
            bonusPercent: bonus,
            softwares: softwares,
            licenseHolders: fJurisdictions,
            liveDealers: dealer,
            mobileVersion: mobile,
            banks: fBanks
        }
        let result = await saveFilterCondition(payload);
        Block.remove(".casino-filter-condition");
        if(result?.isNotAuthenticated) {
            Report.failure(
                'Failed',
                '"You are not authenticated currently." <br/><br/>- Chris',
                'Confirm',
                {
                    failure: {
                        backOverlayColor:  "#21669e1f"
                    },
                    svgSize: '35px',
                    messageMaxLength: 1923,
                    plainText: false,
                },
            );
        }
        else{
            if(result) 
                Report.success(
                    'Succeed',
                    '"You have stored your own filter condition successfully!"<br/><br/> - Chris',
                    'Okay',
                    {
                        success: {
                            svgColor: '#21669e',
                            buttonBackground: '#21669e',
                            backOverlayColor:  "#21669e1f"
                        },
                        svgSize: '35px',
                        messageMaxLength: 1923,
                        plainText: false,
                        backgroundColor: "white",
                    },
                );
            else 
                Report.failure(
                    'Failed',
                    '"You have failed to store your own filter condition!"<br/><br/> - Chris',
                    'Confirm',
                    {
                        svgSize: '35px',
                        messageMaxLength: 1923,
                        plainText: false,
                        backOverlay: true,
                    },
                );
        }
    }

    const resetSearch = () => {
        // setLocation(locationList[0]),
        setNoBonus(false),
        setNoDepositBonus(false),
        setBonus(100),
        setSoftwares([]),
        setFJurisdictions([]),
        setDealer(false),
        setMobile(false),
        setFBanks([]);
    }
    return (
    <>
        <div className="p-6 md:flex casino-filter-condition">

            <div className="md:w-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 border-2 border-sky-700 rounded-xl mx-6 filter-part">
                <div className="flex justify-center p-6">
                    <label className="mt-1">
                        location:&nbsp;&nbsp;
                    </label>
                    <DynamicSingleSelect options={locationList} select={selectLocation} defaultValue={location}/>
                </div>
                <div className="flex justify-center p-6">
                    <label className="mt-1">
                        No Deposit Bonus:&nbsp;&nbsp;
                    </label>
                    <CasinoSwitch checked={noBonus} _onChange={setNoBonus} />
                </div>
                <div className="flex justify-center p-6">
                    <label className="mt-1">
                        Free Spins Bonus:&nbsp;&nbsp;
                    </label>
                    <CasinoSwitch checked={noDepositBonus} _onChange={setNoDepositBonus} />
                </div>
                <div className="flex justify-center p-6">
                    <label className="mt-1" htmlFor="passwordConfirmation">Bonus Percent {bonus}%:&nbsp;&nbsp;</label>
                    <CasinoRangeSlider defaultValue={bonus} _onChange={setBonus}/>
                </div>
                <div className="flex justify-center p-6 md:col-span-2">
                    <label className="mt-1" htmlFor="passwordConfirmation">Softwares:&nbsp;&nbsp;  </label>
                    <DynamicMultiSelect defaultValue={softwares} options={softwareList} select={selectSoftwares}/>
                </div>
                <div className="flex justify-center p-6 md:col-span-2">
                    <label className="mt-1">
                        Licence holders:&nbsp;&nbsp;
                    </label>
                    <DynamicMultiSelect defaultValue={fJurisdictions} options={jurisdictions} select={selectJurisdictions}/>
                </div>

                <div className="flex justify-center p-6">
                    <label className="mt-1">
                        Live Dealers:&nbsp;&nbsp;
                    </label>
                    <CasinoSwitch checked={dealer} _onChange={setDealer} />
                </div>
                
                <div className="flex justify-center p-6">
                    <label className="mt-1">
                        Mobile Version:&nbsp;&nbsp;
                    </label>
                    <CasinoSwitch checked={mobile} _onChange={setMobile} />
                </div>

                <div className="flex justify-center p-6 md:col-span-2">
                    <label className="mt-1" htmlFor="passwordConfirmation">Active Banks:&nbsp;&nbsp;  </label>
                    <DynamicMultiSelect defaultValue={fBanks} options={banks} select={setFBanks}/>
                </div>
            </div>
            <div className='mx-6 md:mx-0 items-center flex flex-col my-button-group'>
                <button
                    onClick={saveSearch} 
                    className='mt-2 w-44 flex items-center bg-sky-700 text-white dark:bg-white dark:text-black py-2 px-6 rounded md:ml-8 rounded-full hover:bg-sky-600 duration-500 font-medium'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    &nbsp;Save search
                </button>
                <button
                    onClick={resetSearch} 
                    className='mt-2 w-44 flex items-center border border-current bg-white text-current dark:bg-black dark:text-white py-2 px-6 rounded md:ml-8 rounded-full hover:bg-sky-100 duration-500 font-medium'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    &nbsp;Reset search
                </button>
            </div>
        </div>
        <div className="content casino-filter-result" id="afc-main">
            <div className="md:container mx-auto text-sky-700 dark:text-white">
                <section className="mx-4">
                    <div className="lg:w-full text-lg lg:text-xl font-medium">
                        <div className="flex flex-col rounded-lg">
                            <h1 className="text-3xl font-bold my-6 flex">
                                Filter Result
                            </h1>
                            
                            {!loading && 
                                <div>
                                    {fCasinos?.length > 0 && 
                                        <CasinoDisplayList data={fCasinos.slice(0, 45)} />
                                    }
                                    {fCasinos?.length === 0 && <h1 className="text-3xl font-bold my-6 flex text-center">
                                        There are no results...
                                    </h1>}
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </>)
}

export default CasinoFilter;