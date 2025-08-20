import { Card } from "@/components/ui/card";
import { DeviceTypeChart } from "@/components/analysis/DeviceTypeChart";
import { FrequencyChart } from "@/components/analysis/FrequencyChart";
import { EncryptionTypeChart } from "@/components/analysis/EncryptionTypeChar";
import { ChannelChart } from "@/components/analysis/ChannelChart";
import { SignalStrengthChart } from "@/components/analysis/SignalStrengthChart";
import { AuthenticationMethodsChart } from "@/components/analysis/AuthenticationChart";

export default function AnalysisPage() {
  return (
    <div className="h-screen">
      <h1 className="text-2xl font-bold m-4">WIFI Analysis</h1>
      <div className="p-4">
        <Card className="p-4">
          <div>
            <h2>Select Area</h2>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-4 gap-4 p-8">
        <DeviceTypeChart />
          <FrequencyChart />
          <EncryptionTypeChart />
          <ChannelChart />
          <SignalStrengthChart />
          <AuthenticationMethodsChart />
      </div>
    </div>
  );
}
