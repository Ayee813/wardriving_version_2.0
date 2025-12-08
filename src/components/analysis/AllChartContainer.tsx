"use client"

import { DeviceTypeChart } from "./DeviceTypeChart"
import { FrequencyChart } from "./FrequencyChart"
import { EncryptionTypeChart } from "./EncryptionTypeChar"
import { ChannelChart } from "./ChannelChart"
import { SignalStrengthChart } from "./SignalStrengthChart"
import { AuthenticationMethodsChart } from "./AuthenticationChart"
import { RadioTypesChart } from "./RadioTypesChart"

export default function AllChartContainer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-8">
      <DeviceTypeChart />
      <FrequencyChart />
      <EncryptionTypeChart />
      <ChannelChart />
      <SignalStrengthChart />
      <AuthenticationMethodsChart />
      <RadioTypesChart />
    </div>
  )
}
