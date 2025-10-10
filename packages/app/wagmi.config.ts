import { defineConfig } from '@wagmi/cli'
import { actions, hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis.ts',
  contracts: [],
  plugins: [
    actions(),
    hardhat({
      project: '../hardhat',
      deployments: {
        TicketContract: {
          11155111: '0x95638257fc0421E18415d83bF5579cf136B56e97',
        },
      },
    }),
  ],
})
