function First()
{
    return (
        <>
        
        {/* <button onClick={clickme}>click to fetch value from other page</button> */}
        <div >
        hi welcome to cpc education
        <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-line fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">STUDENTS</p>
                        <h6 className="mb-0">$1234</h6>
                    </div>
                </div>
            </div>
            
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-line fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">PAYMENTS</p>
                        <h6 className="mb-0">$1234</h6>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-bar fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">COURSES</p>
                        <h6 className="mb-0">$1234</h6>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-area fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">CERTIFICATION</p>
                        <h6 className="mb-0">$1234</h6>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    
        </div>
        </>
    );
}

export default First;