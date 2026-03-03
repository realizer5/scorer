import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <header>
            <nav className="border-b p-4 flex justify-between items-center sticky">
                <h1 className="font-bold text-xl">
                    <Link href="/">CrickTrack</Link>
                </h1>
                <ul className="flex gap-4 *:hover:bg-zinc-800 *:p-2 *:rounded-md">
                    <li>
                        <Link href="/">Tournaments</Link>
                    </li>
                </ul>
                <Button variant="outline">
                    <Link href="/admin/login">Admin Login</Link>
                </Button>
            </nav>
        </header>
    );
}
