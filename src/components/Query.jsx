export default function Query(){
    function runQuery(){

    }
    return(
        <div className = "content grid grid-cols-1" >
            <div className="query_receiver grid-cols-2 rounded-2xl col-span-1"> 

                <input className = "col-span-1 bg-blue-100 h-14 m-2 w-420 rounded-xl shadow-lg placeholder-gray-500" placeholder = "Enter your SQL Query . . ." type = "text"/>
                <div className="col-span-1 flex justify-end mr-4">
                    <button onClick={runQuery}>Execute Query</button>
                </div>
            </div>
            <div className="data_received h-140 bg-gray-200 col-span-1 absolute top-73 w-450 rounded-3xl flex justify-center">
                
            </div>
        </div>
    )
}