import React from "react";  
import NavigationHead from "./NavigationHead";
import NavigationBar from "./NavigationBar";

export default function NavigationAll(){
  return(
    <div 
      className="fixed top-0 left-0 w-full flex z-50 flex-col justify-start"
      
      /* Assuming NavigationHead ~2rem (32px) & NavigationBar ~4rem (64px) height */
    >
      <NavigationHead />
      <NavigationBar />
    </div>
  )
}
