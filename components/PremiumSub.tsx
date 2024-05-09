import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function PremiumSub() {
  return (
    <Card className="bg-transparent text-white rounded-xl border-2">
      <CardHeader>
        <CardTitle className="font-bold text-lg">
          Subscribe to Premium
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p>
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
      </CardContent>
      <CardFooter>
        <button
          type="button"
          className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600"
        >
          Subscribe
        </button>
      </CardFooter>
    </Card>
  );
}
