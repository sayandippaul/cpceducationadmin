import React, { useState, useEffect,useRef } from "react";

var p;
var days=['a','b','c','d','e','f','g'];

p = "mon";
var n1=1;
function Seebatches() {
    const dataFetchedRef = useRef(false);
    const [students, setStudents] = useState([]);

    useEffect((async) => {
        // show="";
        if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
        //Runs only on the first render
        // for(var i=1;i<=7;i++){
        //   // show=show+'<tr><td onClick="{() => setbatch(1)}" scope="col">7:00-9:00AM</td><td  scope="col">9:00-12:00PM</td><td onClick="{() => setbatch('+i+'c)}" scope="col">12:00-2:00PM</td><td onClick="{() => setbatch('+i+'d)}" scope="col">2:00-4:00PM</td><td onClick="{() => setbatch('+i+'e)}" scope="col">4:00-6:00PM</td><td onClick="{() => setbatch('+i+'f)}" scope="col">6:00-8:00PM</td><td onClick="{() => setbatch('+i+'g)}" scope="col">8:00-10:00PM</td></tr>'+'';

        //   }
        // document.getElementById("show").innerHTML=show;
        document.getElementById(p).className = "text-success bg-white";
        
        
        setdate("mon", 1);
        
    }, []);



    const setdate = (e, n) => {
        var da="",db="",dc="",dd="",de="",df="",dg="";

        // e.preventDefault();
        // console.log(e);
        document.getElementById(p).className = "";
        document.getElementById(e).className = "text-success bg-white";
        p = e;

        // p=e;

        var batch = { date: n }
        fetch("http://localhost:3000/getbatch", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(batch)
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setStudents(data);
                // console.log(data[4].batch.length);
                for(var i=0;i<7;i++){
                    // console.log(n1+days[i])
                    document.getElementById(n1+days[i]).setAttribute('id',n+days[i]);
                }
                n1=n;

                //     students.map((data) => (

                //     console.log(String(data.batch[0]))


                //  ))
                var s = "";
                // for(var i=0;i<data.length;i++){
                //     var a=String(data[i].batch[0]);
                //     var b=String(data[i].batch[0]);
                //     if(a==p){
                //         if(b=='a'){

                //             s=s+'<tr><th scope="col">'+data.name+'</th><th scope="col"></th><th scope="col"></th><th scope="col"></th><th scope="col">4:00-6:00PM</th><th scope="col">6:00-8:00PM</th><th scope="col">8:00-10:00PM</th></tr>' 
                //         }
                //     }
                //     else if(b=='a'){

                //         s=s+'<tr><th scope="col"></th><th scope="col">'+data.name+'</th><th scope="col">12:00-2:00PM</th><th scope="col">2:00-4:00PM</th><th scope="col">4:00-6:00PM</th><th scope="col">6:00-8:00PM</th><th scope="col">8:00-10:00PM</th></tr>' 
                //     }
                //  }

                // console.log(a[0]);
                for (var i = 0; i < data.length; i++) {
                    // console.log(data[i].batch.length);
                    for(var j=0;j<data[i].batch.length;j++){

                    
                    var s=String(data[i].batch[j]);
                    var a=s[0];
                    var b=s[1];

                    // var b=String(data[i].batch[0]);
                    // console.log(a+" "+b+" "+n)
                    // var table = document.getElementById("table");
                    // var row = table.insertRow(2);
                    if(a==n1){

                    
                    if(b=="a"){
// alert("hi");



                            da=da+data[i].name+"<hr/>";
                        // var cell1 = row.insertCell(0);
                        // cell1.innerHTML = data[i].name;
                        // table.addColumn("name");
                        // // let tr = document.createElement('tr');

                        //     for (let i = 1; i <= 3; i++) {
                        //         let td = document.createElement('td');
                        //         tr.appendChild(td);
                        // da=data[i].name+"</hr>";
                        // var b=anuo ksks;

                        // eval('var d'+ b +' =+ "'+data[i].name+'";')
                        // console.log("d"+days[j]);
                        // alert(h);
                        // // alert(da);
                        //     }

                        //     table.appendChild(tr);
                    }
                    else if(b=="b"){
                        db=db+data[i].name+"<hr/>";

                    }
                    else if(b=="c"){
                        dc=dc+data[i].name+"<hr/>";

                    } else if(b=="g"){
                        dg=dg+data[i].name+"<hr/>";

                    } else if(b=="d"){
                        dd=dd+data[i].name+"<hr/>";

                    } else if(b=="e"){
                        de=de+data[i].name+"<hr/>";

                    } else if(b=="f"){
                        df=df+data[i].name+"<hr/>";

                    }
                    // var cell2 = row.insertCell(1);
                    // cell2.innerHTML = "NEW CELL2";

                }
                // for(var i=0;i<7;i++){

                //     document.getElementById(n+"a").innerHTML=eval("d"+i+1);
                // }
                // console.log(da+" kjk");
                document.getElementById(n+"a").innerHTML=da;

                document.getElementById(n+"b").innerHTML=db;
                document.getElementById(n+"c").innerHTML=dc;
                document.getElementById(n+"d").innerHTML=dd;
                document.getElementById(n+"e").innerHTML=de;
                document.getElementById(n+"f").innerHTML=df;
                document.getElementById(n+"g").innerHTML=dg;

            }
        }

            })
            .catch((err) => console.log(err));
        }

        return (
            <>

                {/* <button onClick={clickme}>click to fetch value from other page</button> */}
                <div>
                    {/* hi batch */}
                    <div className="container pt-4 ">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="bg-secondary rounded h-100 p-4">
                                    <h6 className="mb-4">See Your Batches Here</h6>
                                    {/* <input id="search-box" /> */}
                                    {/* <form className="d-none d-md-flex ms-4">
                <input
                  className="form-control bg-dark border-0"
                  onChange={filterBySearch}
                  type="search"
                  placeholder="Search by name"
                />
              </form> */}

                                    <div className="table-responsive">
                                        <div id="accordion">
                                            <div className="">
                                                <table id="table" className="table">
                                                    <thead>
                                                        <tr>
                                                            <th id={"mon"} onClick={() => setdate("mon", 1)} scope="col">Monday</th>
                                                            <th id={"tue"} onClick={() => setdate("tue", 2)} scope="col">Tuesday</th>
                                                            <th id={"wed"} onClick={() => setdate("wed", 3)} scope="col">Wednesday</th>
                                                            <th id={"thu"} onClick={() => setdate("thu", 4)} scope="col">Thursday</th>
                                                            <th id={"fri"} onClick={() => setdate("fri", 5)} scope="col">Friday</th>
                                                            <th id={"sat"} onClick={() => setdate("sat", 6)} scope="col">Saturday</th>
                                                            <th id={"sun"} onClick={() => setdate("sun", 7)} scope="col">Sunday</th>

                                                        </tr>
                                                    </thead>

                                                    <thead>
                                                        <tr>
                                                            <th scope="col">7:00-9:00AM</th>
                                                            <th scope="col">9:00-12:00PM</th>
                                                            <th scope="col">12:00-2:00PM</th>
                                                            <th scope="col">2:00-4:00PM</th>
                                                            <th scope="col">4:00-6:00PM</th>
                                                            <th scope="col">6:00-8:00PM</th>
                                                            <th scope="col">8:00-10:00PM</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody id="show">
                                                    {/* {days.map((data) => ( */}
                          {/* // <div> */}
                            
                          {/* // </div> */}
                          <tr>

                          <td id={n1+"a"}  scope="col">No Students</td>
                          <td id={n1+"b"}  scope="col">No Students</td>
                          <td id={n1+"c"}  scope="col">No Students</td>
                          <td id={n1+"d"}  scope="col">No Students</td>
                          <td id={n1+"e"}  scope="col">No Students</td>
                          <td id={n1+"f"}  scope="col">No Students</td>
                          <td id={n1+"g"}  scope="col">No Students</td>

                        </tr>
                      

                        {/* ))} */}
                      
                                                       



                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }

    export default Seebatches;