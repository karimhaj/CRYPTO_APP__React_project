import DataTable from "react-data-table-component";
import { useEffect, useState } from "react"; 
import { useFetchApi } from "./useFetchApi";
import { useSearchParams } from "react-router-dom";


const columns = [
  {
    name: "Nome Mercato",
    selector: (row) => row.symbol,
    sortable: true,
  },
  {
    name: "BaseAsset",
    selector: (row) => row.baseAsset,
    sortable: true,
  },
  {
    name: "QuoteAsset",
    selector: (row) => row.quoteAsset,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row) => row.price,
  },
];

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false


// async function fetcher2(){
//   const fetchPrice = await fetch(url2)
//   const fetchSymbols = await fetch(urlCrypto)
//   const fetchPriceJson = await fetchPrice.json()
//   const fetchSymbolsJson = await fetchSymbols.json()
//   const concatData = await fetchSymbolsJson.concat(fetchPriceJson);

// }


export function Markets() {
 const {symbol, price, error, loading} = useFetchApi()
  const [data, setData]= useState(symbol)
  const [searchedText, setSearchedText] = useState('');

  const [searchParams] = useSearchParams(); 
  const filterBaseAsset = searchParams.get('base_assets'); 
 
  let priceMap = price.reduce((acc, curr) => {
    acc[curr.symbol] = curr
    return acc; }, {});
    let combined = symbol.map(sign=> Object.assign(sign, priceMap[sign.symbol]))

    // const newCombined =useMemo(()=>{symbol.map(sign=> Object.assign(sign, priceMap[sign.symbol]))
    // },[priceMap, symbol])
  


        //setFilteredData(combined?.filter(item=> item.symbol?.toLowerCase().includes(searchedText.toLowerCase())))
    



  // }, [price, symbol] )

  // setData(symbol)
  // console.log(data)
  
  let money = combined?.filter((coin)=> coin.symbol?.toLowerCase().includes(searchedText.toLowerCase()))

  if(filterBaseAsset){
    money = money.filter((data)=> data.baseAsset === filterBaseAsset)
  }

  useEffect(()=>{
    setData(money)
  }, [money])

  // useEffect(() => {
  //   if (combined){
  //     setFilteredData(combined?.filter(item=> item.symbol?.toLowerCase().includes(searchedText.toLowerCase())))
  //   }
  // }, [combined , searchedText])

  return (
    <div className="App">
        {loading && <h2>Loading data...</h2>}
        {error && <h3>an error has occurred.</h3>}
        {data && <>
          <div className="search-bar--container">
              <input type="text" value={searchedText} onChange={(event) => setSearchedText(event.target.value)} placeholder="search..." className="search-bar"/></div>
              <DataTable columns={columns} data={data} pagination noDataComponent={<h2>Loading data...</h2>}/></>
        }


    </div>
  );
}

export default Markets;

// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import { Home } from "./Home";

// export function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
