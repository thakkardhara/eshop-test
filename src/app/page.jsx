
import Products from "@/components/Products";
import { Suspense } from "react";

export default function Home() {
  return (
   <>
      <Suspense fallback={<div>
        
         <div className="flex justify-center items-center h-screen">
           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
         </div>
        
      </div>}>
         <Products />
       </Suspense>
    
   </>
  );
}
