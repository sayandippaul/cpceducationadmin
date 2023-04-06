  function closesidebar()
{
    const closesidebar = () => {
        // console.log('button clicked');
        // $('.sidebar-toggler').click(function () {
        //     $('.sidebar, .content').toggleClass("open");
        //     return false;
        // });
    // document.getElementById("close").style.width=0;
    // document.querySelector('.sidebar, .content').classList.toggle("open");
    document.querySelector('.content').classList.toggle("open");
    document.querySelector('.sidebar').classList.toggle("open");
    
    // return false;
    
      };
    
    return (
      <>
      </>
    );
}

export default closesidebar;