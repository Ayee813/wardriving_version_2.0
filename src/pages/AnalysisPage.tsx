import { Card } from "@/components/ui/card";
import AllChartContainer from "@/components/analysis/AllChartContainer";

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
      {/** Charts will be rendered here */}
      <AllChartContainer />

    </div>
  );
}
