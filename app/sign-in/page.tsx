import { useUser } from "@clerk/nextjs";
import { SignUp, SignIn, SignedIn, SignedOut } from "@clerk/nextjs/app-beta";

export default function page() {

  return (
    <div>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <div>
          {/* <button onClick={() => signOut()}>Sign out</button> */}
        </div>
      </SignedIn>
    </div>
  );
}
