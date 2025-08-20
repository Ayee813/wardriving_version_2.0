import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MapNav() {
  const [passwordFilter, setPasswordFilter] = useState<string>("all");
  return (
    <div className="h-12 w-full flex flex-col items-center justify-center bg-white px-4 text-white shadow-md">
      <div className="flex w-full items-center gap-2 justify-center">
        <div className="flex gap-2">
          <Button className="rounded-full cursor-pointer" onClick={() => setPasswordFilter("all")} id={passwordFilter === "all" ? "button-active" : undefined}>ALL</Button>
          <Button className="rounded-full cursor-pointer" onClick={() => setPasswordFilter("wpa")} id={passwordFilter === "wpa" ? "button-active" : undefined}>WPA</Button>
          <Button className="rounded-full cursor-pointer" onClick={() => setPasswordFilter("wpa2")} id={passwordFilter === "wpa2" ? "button-active" : undefined}>WPA2</Button>
          <Button className="rounded-full cursor-pointer" onClick={() => setPasswordFilter("wpa3")} id={passwordFilter === "wpa3" ? "button-active" : undefined}>WPA3</Button>
          <Button className="rounded-full cursor-pointer" onClick={() => setPasswordFilter("open")} id={passwordFilter === "open" ? "button-active" : undefined}>OPEN</Button>
        </div>
        <Input
          type="email"
          placeholder="Search by BSSID ..."
          className="rounded-full border-2 border-gray-300 px-4 py-2 w-56 text-black"
        />
        <Button type="submit" className="rounded-full cursor-pointer">
          Search
        </Button>
      </div>
    </div>
  );
}
