"use client";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function page() {
    const socket = io("http://localhost:4000/");
    const sendScore = () => {
        const data = { matchId: "match-123", over: 1, ball: 1, runs: 6 };
        socket.emit("score-update", data);
    };
    const connectSocket = () => {
        socket.emit("join-match", "match-123");
        socket.on("score-update", (data) => {
            console.log(data.over, data.ball, data.runs);
        });
    };
    useEffect(() => {
        connectSocket();
    }, []);
    return (
        <div>
            <Button onClick={sendScore}>nise</Button>
        </div>
    );
}
