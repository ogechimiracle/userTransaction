"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import {AiOutlineSearch, AiOutlinePlus, AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import CustomDropdown from "./components/dropdown";
import { getTransactions } from "./lib/api/api";
import { formatDate } from "./lib/extra";
import Spinner from "./components/spinner";


export default function Home() {

   const handleSelect = (value: string | null) => {
    console.log("Selected:", value);
    setFilterCurrency(value)
  };

  const [transaction, setTransaction] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [filterCurrency, setFilterCurrency] = useState<string|null>(null)
  const [searchData, setSearchData] = useState<string>("")

  useEffect(()=>{

    async function fetchData(){
      try {
        
        const data = await getTransactions()
        setTransaction(data)
      } catch (error) {
        console.log("error while loading data",error)
        setLoading(false)
      }
      finally{
        setLoading(false) 
      }
    }

    fetchData()

  },[])

  const filteredTransactions = transaction.filter((tx:any) => {
  const matchesCurrency =   !filterCurrency || filterCurrency =="ALL" || tx.type === filterCurrency;
  const matchesSearch = searchData
    ? Object.values(tx).some((field) =>
        String(field).toLowerCase().includes(searchData.toLowerCase())
      )
    : true;
  return matchesCurrency && matchesSearch;
});


  

  return (
    <div className="font-sans">
     
     <div className="container px-5 lg:px-15 mx-auto">


      <div className="mt-2 mb-5 py-8">
        <div className="py-2 flex justify-between items-center mb-2">
          <p className="text-2xl font-semibold text-black">User Transaction</p>
          <div className="flex items-center gap-1.5">
            <p>Total</p>
            <span className="size-8 rounded-full grid place-content-center bg-green-200 text-black font-semibold">{transaction.length}</span>
          </div>
        </div>
          <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-y-0 items-center justify-between">
              <div>
                
                  <div className="relative w-full max-w-sm">
                    <AiOutlineSearch 
                      size={20} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
                    />
                    <input type="search" value={searchData} onChange={(e)=>{setSearchData(e.target.value)}} placeholder="Search"  className="px-12 py-2 rounded-xl border-[1.3px] focus:outline-[1.3px] focus:outline-green-200 "  />
                    
                  </div>

              </div>

              <div className="flex items-center gap-x-8">
                  <div>
                    <CustomDropdown onSelect={handleSelect} />
                  </div>

                  <button className="bg-green-400 text-black font-semibold text-sm rounded-lg px-5 py-2.5 cursor-pointer flex items-center gap-x-1">
                    <AiOutlinePlus size={12}/>
                    <span className="text-xs lg:text-sm">Add manually</span>
                  </button>
              </div>
          </div>
      </div>


      <div className="bg-white shadow-md rounded-lg px-4 py-3">
        
       
<div className="flex flex-col">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Type</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Currency</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Date</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">

            {loading ? (
              <tr className="grid place-content-center">
                <td colSpan={5} className=" flex justify-center items-center py-6 text-gray-500">
                  <Spinner size="lg" colorClass="text-green-500" showText text="Loading transactions..." />
                </td>
              </tr>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx: any) => (
                <tr
                  key={tx.transactionId}
                  className="text-sm text-gray-700 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{tx.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{tx.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{tx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{tx.currency}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(tx.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 items-center">
                    <button className="px-1.5 py-1 rounded-md text-black bg-red-300 cursor-pointer">
                      <AiOutlineDelete size={18}/>
                    </button>
                    <button className="px-1.5 py-1 rounded-md text-black bg-gray-100 cursor-pointer">
                      <AiOutlineEdit size={18}/>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}

    
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

      </div>



     </div>
      
    </div>
  );
}
