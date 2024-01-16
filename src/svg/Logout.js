
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';


export default function Logout() {
   const navigate=useNavigate()
  //  const toast=useToast();
  // console.log('running')

  const handleLogout=async()=>{
 

      const auth = localStorage.getItem("token");

      if (!auth) {
        navigate("/");
      }
      localStorage.removeItem("token")
      navigate("/");
      // const response=await fetch('https://travelanywhereindia-2rvx.onrender.com/api/v1/users/logout',{
      //   // method: "POST",
      //   headers: {
      //     // "Content-Type": "application/json",
      //     // Authorization: `Bearer ${auth}`,
      //   },
      //   credentials: "include",
      // })

      // const result=await response.json();

      // if(result.msg==='Token is not correct'){
      //   localStorage.removeItem('token');
      //   navigate('/')
      // }


    //   if(result.success===false){
    //     toast({
    //       title: "Some Error happened",
    //       position: "top",
    //       description: "Try after some time",
    //       status: "error",
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //     return;
    //   }

    //   if(result.success===true){
    //   localStorage.removeItem('token');
    //   navigate('/')}
    // }catch(error){
    //   console.error("Error:", error.message);
    // }
    
  }
    
const logout=`<svg width="45" height="49" viewBox="0 0 45 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.5001 7V4.5C29.5001 3.1193 28.3808 2 27.0001 2H4.50001C3.11928 2 2 3.1193 2 4.5V44.5C2 45.8807 3.1193 47 4.50001 47H27.0001C28.3808 47 29.5001 45.8807 29.5001 44.5V42" stroke="#95555D" stroke-width="4" stroke-linecap="round"/>
<path d="M14.5 24.5H42.0001" stroke="#95555D" stroke-width="4" stroke-linecap="round"/>
<path d="M33.25 15.75L42 24.5L33.25 33.25" stroke="#95555D" stroke-width="4" stroke-linecap="round"/>
</svg>`


  return (
    <>
    <span dangerouslySetInnerHTML={{__html:logout}}  style={{cursor:'pointer',width:'45px', height:'49px'}} title='Logout' onClick={handleLogout}></span>
    </>
  )
}
