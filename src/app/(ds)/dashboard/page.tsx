import React from 'react'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const {getUser} = getKindeServerSession();
const user = await getUser();

console.log(user);
export default function page() {
  return (
    <div>page</div>
  )
}
