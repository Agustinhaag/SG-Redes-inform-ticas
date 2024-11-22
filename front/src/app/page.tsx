'use client'
import { useSelector } from "react-redux";


export default function Home() {
  const dataUser = useSelector((state: any) => state.user.user);
 
  return (
   <main>
    hola
   </main>
  );
}
