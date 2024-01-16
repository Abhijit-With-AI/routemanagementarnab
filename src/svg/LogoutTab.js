
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export default function LogoutTab() {
  const navigate=useNavigate()
  const toast=useToast();
  const handleLogout=async()=>{
    // try{

      const auth = localStorage.getItem("token");

      if (!auth) {
        navigate("/");
      }
      localStorage.removeItem("token")
      navigate("/");
    //   const response=await fetch('https://travelanywhereindia-2rvx.onrender.com/api/v1/users/logout',{
    //     method: "POST",
    //     headers: {
    //       // "Content-Type": "application/json",
    //       // Authorization: `Bearer ${auth}`,
    //     },
    //     credentials: "include",
    //   })

    //   const result=await response.json();



    //   if(result.msg==='Token is not correct'){
    //     // localStorage.removeItem('token');
    //     navigate('/')
    //   }
      
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
    //   // localStorage.removeItem('token');
    //   navigate('/')}
    // }catch(error){
    //   console.error("Error:", error.message);
    // }
    
  }

    const logouttab=`<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.75 3V2C14.75 1.44772 14.1904 1 13.5 1H2.25C1.55964 1 1 1.44772 1 2V18C1 18.5523 1.55965 19 2.25 19H13.5C14.1904 19 14.75 18.5523 14.75 18V17" stroke="#95555D" stroke-width="2" stroke-linecap="round"/>
    <path d="M7.25 10H21" stroke="#95555D" stroke-width="2" stroke-linecap="round"/>
    <path d="M16.625 6.50098L21 10.001L16.625 13.501" stroke="#95555D" stroke-width="2" stroke-linecap="round"/>
    </svg>`


  return (
    <>
    <span dangerouslySetInnerHTML={{__html:logouttab}}  style={{cursor:'pointer', width:'23px', height:'20px'}} title='Logout' onClick={handleLogout}></span>
    </>
  )
}
