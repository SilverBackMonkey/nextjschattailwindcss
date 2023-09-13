import React from 'react';

export default function FullModal({children, setShow, searchKey, search, changeVal}) {

    const toggle = (e) => {
        e.preventDefault();
        setShow(false);
    }

    return (
        <div id="modal" className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal">
            <div className="relative mx-auto shadow-xl rounded-md bg-white max-w-md">

                <div className="flex items-start justify-between p-5 rounded-t">
                    <div className="md:basis-1/4 flex items-center justify-start space-x-4 ml-2 mt-2">
                        <div className="relative text-current">
                            <form action={search}>
                                <input 
                                    type="search" 
                                    name="serch"
                                    value={searchKey}
                                    onChange={e => changeVal(e)}
                                    placeholder="Search"
                                    className="bg-gray h-10 sm:w-40 md:w-48 px-5 pr-10 border-2 border-gray-500 hover:border-current rounded-full text-md focus:outline-none" />
                                
                                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{background:"new 0 0 56.966 56.966"}} xmlSpace="preserve" width="512px" height="512px">
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                    <button onClick={e=> toggle(e)}>x</button>
                </div>

                <div className="max-h-3/4 overflow-y-scroll px-4">
                    {children}
                </div>
                <div className="px-4 flex justify-end items-center space-x-4 py-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={e=> toggle(e)}>Go Back</button>
                </div>
            </div>
        </div>
    );
}
